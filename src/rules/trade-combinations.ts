import { Card, Player } from '@alexterliuk/cards-on-table';
import { MoveCardActionType, PlayerActionTypeEnum } from '../actions/types';
import DebertsGame from '../game';
import { getPlayer, sort } from '../utils';

function canPlayerTradeCombination(player: Player, game: DebertsGame) {
  const { currentRoundActions } = game;

  const moves = currentRoundActions.filter(
    action => action.type === PlayerActionTypeEnum.MOVE_CARD,
  );

  const hasPlayerMoved = moves.find(
    move =>
      getPlayer(game, (move as MoveCardActionType).playerIndex) === player,
  );

  if (hasPlayerMoved) {
    return { error: 14 }; // player can't trade combination if they already made a move
  }

  return true;
}

function isValidCombination(combination: Card[]) {
  const isValidQty = combination.length > 2;
  const isSameSuit = combination.every(
    card => card.suit === combination[0].suit,
  );

  const sortedCombination = sort('asc', combination, 'rank') as Card[];
  const cardRanks = sortedCombination.map(card => card.rank);

  const lowestRank = cardRanks[0];
  const highestRank = cardRanks[cardRanks.length - 1];
  const isAdjacent = lowestRank + cardRanks.length - 1 === highestRank;

  const isValid = isValidQty && isSameSuit && isAdjacent;

  if (!isValid) {
    return { error: 15 }; // player combination is invalid (card qty < 3, different suit, not adjacent cards)
  }

  return true;
}

function rankCombinations(
  records: { player: Player; combination: Card[] }[],
  game: DebertsGame,
): { player: Player; combination: Card[]; win: boolean }[] | { error: number } {
  const { trumpSuitName } = game.table.deck;

  const invalidRecords: {
    player: Player;
    combination: Card[];
    error: number;
  }[] = [];

  const { recordsMap, combinations } = Object.entries(records).reduce(
    (
      acc: { recordsMap: Map<Card[], Player>; combinations: Card[][] },
      entry,
    ) => {
      acc.recordsMap.set(entry[1].combination, entry[1].player);
      acc.combinations.push(entry[1].combination);

      const isValid = isValidCombination(entry[1].combination);

      if (isValid !== true) {
        invalidRecords.push({
          player: entry[1].player,
          combination: entry[1].combination,
          error: isValid.error,
        });
      }

      return acc;
    },
    { recordsMap: new Map(), combinations: [] },
  );

  if (invalidRecords.length > 0) {
    return { error: 16 }; // player combination is invalid
  }

  const combinationsByTrumpSuit = combinations.reduce((acc: Card[][], comb) => {
    const method = comb[0].suit === trumpSuitName ? 'unshift' : 'push';
    acc[method](comb);

    return acc;
  }, []);

  const combinationsWithCardsInOrder = combinationsByTrumpSuit.map(comb =>
    sort<Card, keyof Card>('desc', comb, 'rank'),
  ) as Card[][];

  const combinationsByCardsSeniority = sort<Card, keyof Card>(
    'desc',
    combinationsWithCardsInOrder,
    'rank',
    0,
  ) as Card[][];

  const combinationsByCardsQuantity = sort(
    'desc',
    combinationsByCardsSeniority,
    'length',
  ) as Card[][];

  const rankedCombinations = combinationsByCardsQuantity.reduce(
    (
      acc: { player: Player; combination: Card[]; win: boolean }[],
      comb,
      index,
    ) => {
      const player = recordsMap.get(comb) as Player;

      if (index === 0) {
        acc.push({
          player,
          combination: comb,
          win: true,
        });

        return acc;
      }

      const isPrevCombWin = acc[index - 1].win;

      if (isPrevCombWin) {
        const prevComb = acc[index - 1].combination;
        const isEqualByQuantity = comb.length === prevComb.length;
        const isEqualBySeniorCard = comb[0].rank === prevComb[0].rank;
        const isEqualByCardSuit =
          prevComb[0].suit === trumpSuitName
            ? comb[0].suit === prevComb[0].suit
            : true;

        acc.push({
          player,
          combination: comb,
          win: isEqualByQuantity && isEqualBySeniorCard && isEqualByCardSuit,
        });

        return acc;
      }

      acc.push({
        player,
        combination: comb,
        win: false,
      });

      return acc;
    },
    [],
  );

  return rankedCombinations;
}

function isDebertsCombination(combination: Card[]) {
  return isValidCombination(combination) === true && combination.length === 8;
}

export default [
  canPlayerTradeCombination,
  isValidCombination,
  rankCombinations,
  isDebertsCombination,
];
