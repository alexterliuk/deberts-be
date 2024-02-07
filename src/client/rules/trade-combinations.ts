import { Card, Player } from '@alexterliuk/cards-on-table';
import { DebertsGame } from '../game';
import { getCardRankForCombination, hasPlayerMoved, sort } from '../utils';
import { CardNameType, SuitNameType } from '../data/types';
import { CardFaceType } from '../data/types';

export function canPlayerTradeCombination(
  records: { player: Player; combination: Card[] }[],
  game: DebertsGame,
) {
  const hasPlayerMadeAMove = hasPlayerMoved(game, records[0]?.player);
  if (hasPlayerMadeAMove) {
    return { error: 14 }; // player can't trade combination if they already made a move
  }

  return true;
}

type CardWithCombRankType = CardFaceType & Record<'rankForCombination', number>;

export function rankCombinations(
  records: { player: Player; combination: Card[] }[],
  game: DebertsGame,
): { player: Player; combination: Card[]; win: boolean; error: number }[] {
  const { trumpSuitName } = game.table.deck;

  const invalidRecords: {
    player: Player;
    combination: Card[];
    win: boolean;
    error: number;
  }[] = [];

  const {
    recordsMap,
    combinationsWithCombRank,
    combinationsWithCombRankMap,
  } = Object.entries(records).reduce(
    (
      acc: {
        recordsMap: Map<Card[], Player>;
        combinations: Card[][];
        combinationsWithCombRank: CardWithCombRankType[][];
        combinationsWithCombRankMap: Map<CardWithCombRankType[], Card[]>;
      },
      entry,
    ) => {
      acc.recordsMap.set(entry[1].combination, entry[1].player);
      acc.combinations.push(entry[1].combination);

      const combinationWithCombRank = entry[1].combination.map(card => ({
        name: card.name as CardNameType,
        suit: card.suit as SuitNameType,
        rankForCombination: getCardRankForCombination(
          card.name as CardNameType,
        ),
      }));
      acc.combinationsWithCombRank.push(combinationWithCombRank);
      acc.combinationsWithCombRankMap.set(
        combinationWithCombRank,
        entry[1].combination,
      );

      const isValid = isValidCombination(entry[1].combination);

      if (isValid !== true) {
        invalidRecords.push({
          player: entry[1].player,
          combination: entry[1].combination,
          win: false,
          error: isValid.error,
        });
      }

      return acc;
    },
    {
      recordsMap: new Map(),
      combinations: [],
      combinationsWithCombRank: [],
      combinationsWithCombRankMap: new Map(),
    },
  );

  if (invalidRecords.length > 0) {
    return invalidRecords;
  }

  const combinationsByTrumpSuit = combinationsWithCombRank.reduce(
    (acc: CardWithCombRankType[][], comb) => {
      const method = comb[0].suit === trumpSuitName ? 'unshift' : 'push';
      acc[method](comb);

      return acc;
    },
    [],
  );

  const combinationsWithCardsInOrder = combinationsByTrumpSuit.map(comb =>
    sort<CardWithCombRankType, keyof CardWithCombRankType>(
      'desc',
      comb,
      'rankForCombination',
    ),
  ) as CardWithCombRankType[][];

  const combinationsByCardsSeniority = sort<
    CardWithCombRankType,
    keyof CardWithCombRankType
  >(
    'desc',
    combinationsWithCardsInOrder,
    'rankForCombination',
    0,
  ) as CardWithCombRankType[][];

  const combinationsByCardsQuantity = sort(
    'desc',
    combinationsByCardsSeniority,
    'length',
  ) as CardWithCombRankType[][];

  const rankedCombinationsWithCardsWithCombRank = combinationsByCardsQuantity.reduce(
    (
      acc: {
        player: Player;
        combination: CardWithCombRankType[];
        win: boolean;
        error: number;
      }[],
      comb,
      index,
    ) => {
      const combination = combinationsWithCombRankMap.get(comb) as Card[];
      const player = recordsMap.get(combination) as Player;

      if (index === 0) {
        acc.push({
          player,
          combination: comb,
          win: true,
          error: -1,
        });

        return acc;
      }

      const isPrevCombWin = acc[index - 1].win;

      if (isPrevCombWin) {
        const prevComb = acc[index - 1].combination;
        const isEqualByQuantity = comb.length === prevComb.length;
        const isEqualBySeniorCard =
          comb[0].rankForCombination === prevComb[0].rankForCombination;
        const isEqualByCardSuit =
          prevComb[0].suit === trumpSuitName
            ? comb[0].suit === prevComb[0].suit
            : true;

        acc.push({
          player,
          combination: comb,
          win: isEqualByQuantity && isEqualBySeniorCard && isEqualByCardSuit,
          error: -1,
        });

        return acc;
      }

      acc.push({
        player,
        combination: comb,
        win: false,
        error: -1,
      });

      return acc;
    },
    [],
  );

  const rankedCombinations = rankedCombinationsWithCardsWithCombRank.map(
    entry => ({
      ...entry,
      combination: combinationsWithCombRankMap.get(entry.combination) as Card[],
    }),
  );

  return rankedCombinations;
}

export function isValidCombination(combination: Card[]) {
  const isValidQty = combination.length > 2 && combination.length < 9;
  const isSameSuit = combination.every(
    card => card.suit === combination[0].suit,
  );

  const combinationWithCombRanks = combination.map(card => ({
    name: card.name as CardNameType,
    combRank: getCardRankForCombination(card.name as CardNameType),
  }));

  const sortedCombination = sort(
    'asc',
    combinationWithCombRanks,
    'combRank',
  ) as { name: CardNameType; combRank: number }[];
  const combRanks = sortedCombination.map(card => card.combRank);

  const lowestRank = combRanks[0];
  const highestRank = combRanks[combRanks.length - 1];
  const isAdjacent = lowestRank + combRanks.length - 1 === highestRank;

  const isValid = isValidQty && isSameSuit && isAdjacent;

  if (!isValid) {
    return { error: 15 }; // player combination is invalid (card qty < 3 || > 8, different suit, not adjacent cards)
  }

  return true;
}

export function isDebertsCombination(
  combination: Card[],
  game: DebertsGame,
  player: Player,
) {
  if (isValidCombination(combination) !== true) {
    return false;
  }

  const isTradingSuitsPhase = game.currentRound === 0;
  const hasPlayerMadeAMove = hasPlayerMoved(game, player);

  return (
    /* when trading suits phase, combination must consist of adjacent cards */
    (isTradingSuitsPhase &&
      combination.length === 6 &&
      !!combination.find(card => card.name === 'ace')) ||
    /* when actual playing, combination must consist of a suit's all cards */
    (!isTradingSuitsPhase && !hasPlayerMadeAMove && combination.length === 8)
  );
}
