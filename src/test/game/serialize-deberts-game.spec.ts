import { describe, expect, it } from 'vitest';
import { serializeDebertsGame } from '../../client/game/sr';
import { CardSR } from '../../client/game/types';
import {
  declareBella,
  move,
  suggestSuit,
  swapCards,
  tradeCombinations,
} from './actions-mock';
import { game } from './mock';

const serializedGame = serializeDebertsGame(game);

describe(`serializeDebertsGame`, () => {
  it(`serializes meta`, () => {
    const { meta } = serializedGame;

    expect(meta.initiatedBy).toBe(game.meta.initiatedBy);
    expect(meta.time.startedAt).toBe(game.meta.time.startedAt);
    expect(meta.time.finishedAt).toBe(game.meta.time.finishedAt);
    expect(meta.time.pausedAt).toBe(game.meta.time.pausedAt);
  });

  it(`serializes table.beatArea`, () => {
    const { beatArea } = serializedGame.table;

    expect(beatArea[0].playerId).toBe(game.playersRecs[0].id);
    expect(beatArea[0].cards.length).toBe(2);

    expect(beatArea[0].cards[0].name).toBe('king');
    expect(beatArea[0].cards[0].opened).toBe(true);
    expect(beatArea[0].cards[0].rank).toBe(6);
    expect(beatArea[0].cards[0].suit).toBe('spades');
    expect(beatArea[0].cards[0].value).toBe(4);

    expect(beatArea[0].cards[1].name).toBe('queen');
    expect(beatArea[0].cards[1].opened).toBe(false);
    expect(beatArea[0].cards[1].rank).toBe(5);
    expect(beatArea[0].cards[1].suit).toBe('spades');
    expect(beatArea[0].cards[1].value).toBe(3);
  });

  it(`serializes table.discardPile`, () => {
    const { discardPile } = serializedGame.table;

    expect(discardPile[0].name).toBe('nine');
    expect(discardPile[0].rank).toBe(3);
    expect(discardPile[0].suit).toBe('hearts');
    expect(discardPile[0].value).toBe(0);

    expect(discardPile[1].name).toBe('eight');
    expect(discardPile[1].rank).toBe(2);
    expect(discardPile[1].suit).toBe('hearts');
    expect(discardPile[1].value).toBe(0);

    expect(discardPile[2].name).toBe('seven');
    expect(discardPile[2].rank).toBe(1);
    expect(discardPile[2].suit).toBe('hearts');
    expect(discardPile[2].value).toBe(0);
  });

  it(`serializes table.playersBulks`, () => {
    const { playersBulks } = serializedGame.table;

    expect(playersBulks.length).toBe(3);
    expect(playersBulks[0].playerId).toBe(null);

    expect(playersBulks[1].playerId).toBe('a');
    expect(playersBulks[1].cards.length).toBe(1);
    expect((playersBulks[1].cards[0] as CardSR).name).toBe('ten');
    expect((playersBulks[1].cards[0] as CardSR).suit).toBe('hearts');

    expect(playersBulks[2].playerId).toBe('b');
    expect(playersBulks[2].cards.length).toBe(0);
  });

  it(`serializes table.playersCorners`, () => {
    const { playersCorners } = serializedGame.table;

    expect(playersCorners.length).toBe(2);

    expect(playersCorners[0].playerId).toBe('a');
    expect(playersCorners[0].cards.length).toBe(0);
    expect(playersCorners[0].buyInCards.length).toBe(0);
    expect(playersCorners[0].takes.length).toBe(0);

    expect(playersCorners[1].playerId).toBe('b');
    expect(playersCorners[1].cards.length).toBe(2);
    expect((playersCorners[1].cards[0] as CardSR).name).toBe('ace');
    expect((playersCorners[1].cards[0] as CardSR).suit).toBe('spades');
    expect((playersCorners[1].cards[1] as CardSR).name).toBe('ten');
    expect((playersCorners[1].cards[1] as CardSR).suit).toBe('spades');
    expect(playersCorners[1].buyInCards.length).toBe(3);
    expect((playersCorners[1].buyInCards[0] as CardSR).name).toBe('king');
    expect((playersCorners[1].buyInCards[0] as CardSR).suit).toBe('hearts');
    expect((playersCorners[1].buyInCards[1] as CardSR).name).toBe('queen');
    expect((playersCorners[1].buyInCards[1] as CardSR).suit).toBe('hearts');
    expect((playersCorners[1].buyInCards[2] as CardSR).name).toBe('jack');
    expect((playersCorners[1].buyInCards[2] as CardSR).suit).toBe('hearts');
    expect(playersCorners[1].takes.length).toBe(1);
    expect(playersCorners[1].takes[0][0].name).toBe('queen');
    expect(playersCorners[1].takes[0][0].suit).toBe('spades');
    expect(playersCorners[1].takes[0][1].name).toBe('jack');
    expect(playersCorners[1].takes[0][1].suit).toBe('spades');
    expect(playersCorners[1].takes[0][2].name).toBe('nine');
    expect(playersCorners[1].takes[0][2].suit).toBe('spades');
  });

  it(`serializes table.trumpCardCell`, () => {
    const { trumpCardCell } = serializedGame.table;

    expect(trumpCardCell?.name).toBe('eight');
    expect(trumpCardCell?.suit).toBe('spades');
  });

  it(`serializes table.deck`, () => {
    const { deck } = serializedGame.table;

    expect(deck.openedTrumpCard?.name).toBe('seven');
    expect(deck.openedTrumpCard?.suit).toBe('spades');
    expect(deck.shuffledLastTime).toBe(12);
    expect(deck.trumpSuitName).toBe('diamonds');

    expect(deck.takenCards.length).toBe(6);
    expect(deck.takenCards[0].name).toBe('eight');
    expect(deck.takenCards[0].suit).toBe('spades');
    expect(deck.takenCards[1].name).toBe('seven');
    expect(deck.takenCards[1].suit).toBe('spades');
    expect(deck.takenCards[2].name).toBe('ace');
    expect(deck.takenCards[2].suit).toBe('hearts');
    expect(deck.takenCards[3].name).toBe('ten');
    expect(deck.takenCards[3].suit).toBe('hearts');
    expect(deck.takenCards[4].name).toBe('king');
    expect(deck.takenCards[4].suit).toBe('hearts');
    expect(deck.takenCards[5].name).toBe('queen');
    expect(deck.takenCards[5].suit).toBe('hearts');

    expect(deck.allCards.length).toBe(32);
    expect(deck.allCards[0].name).toBe('ace');
    expect(deck.allCards[0].suit).toBe('spades');
    expect(deck.allCards[0].value).toBe(11);
    expect(deck.allCards[0].rank).toBe(8);
    expect(deck.allCards[0].opened).toBe(false);
    expect(deck.allCards[31].name).toBe('seven');
    expect(deck.allCards[31].suit).toBe('clubs');
    expect(deck.allCards[31].value).toBe(0);
    expect(deck.allCards[31].rank).toBe(1);
    expect(deck.allCards[31].opened).toBe(false);

    expect(deck.suitNames).toEqual(['spades', 'hearts', 'diamonds', 'clubs']);

    expect(Object.keys(deck.suits)).toEqual([
      'spades',
      'hearts',
      'diamonds',
      'clubs',
    ]);
    expect(deck.suits.spades.name).toBe('spades');
    expect(deck.suits.spades.cards.length).toBe(8);
    expect(deck.suits.spades.cards[0].name).toBe('ace');
    expect(deck.suits.spades.cards[0].suit).toBe('spades');
    expect(deck.suits.spades.cards[7].name).toBe('seven');
    expect(deck.suits.spades.cards[7].suit).toBe('spades');

    expect(deck.suits.hearts.name).toBe('hearts');
    expect(deck.suits.hearts.cards.length).toBe(8);
    expect(deck.suits.hearts.cards[0].name).toBe('ace');
    expect(deck.suits.hearts.cards[0].suit).toBe('hearts');
    expect(deck.suits.hearts.cards[7].name).toBe('seven');
    expect(deck.suits.hearts.cards[7].suit).toBe('hearts');

    expect(deck.suits.diamonds.name).toBe('diamonds');
    expect(deck.suits.diamonds.cards.length).toBe(8);
    expect(deck.suits.diamonds.cards[0].name).toBe('ace');
    expect(deck.suits.diamonds.cards[0].suit).toBe('diamonds');
    expect(deck.suits.diamonds.cards[7].name).toBe('seven');
    expect(deck.suits.diamonds.cards[7].suit).toBe('diamonds');

    expect(deck.suits.clubs.name).toBe('clubs');
    expect(deck.suits.clubs.cards.length).toBe(8);
    expect(deck.suits.clubs.cards[0].name).toBe('ace');
    expect(deck.suits.clubs.cards[0].suit).toBe('clubs');
    expect(deck.suits.clubs.cards[7].name).toBe('seven');
    expect(deck.suits.clubs.cards[7].suit).toBe('clubs');

    expect(deck.trumpCardsValues.jack).toEqual({ rank: 8, value: 20 });
    expect(deck.trumpCardsValues.nine).toEqual({ rank: 7, value: 14 });
    expect(deck.trumpCardsValues.ace).toEqual({ rank: 6, value: 11 });
    expect(deck.trumpCardsValues.ten).toEqual({ rank: 5, value: 10 });
    expect(deck.trumpCardsValues.king).toEqual({ rank: 4, value: 4 });
    expect(deck.trumpCardsValues.queen).toEqual({ rank: 3, value: 3 });
    expect(deck.trumpCardsValues.eight).toEqual({ rank: 2, value: 0 });
    expect(deck.trumpCardsValues.seven).toEqual({ rank: 1, value: 0 });

    expect(deck.trumpSuitCardsData).toEqual([
      ['jack', 20, 8],
      ['nine', 14, 7],
      ['ace', 11, 6],
      ['ten', 10, 5],
      ['king', 4, 4],
      ['queen', 3, 3],
      ['eight', 0, 2],
      ['seven', 0, 1],
    ]);
  });

  it(`serializes playersRecs`, () => {
    const { playersRecs } = serializedGame;

    expect(playersRecs.length).toBe(2);

    expect(playersRecs[0].id).toBe('a');
    expect(playersRecs[0].name).toBe('Edgar');
    expect(playersRecs[0].player.bonuses).toEqual([
      { name: 'Bella', value: 20 },
    ]);

    const { combinations } = playersRecs[0].player;
    expect(combinations.length).toBe(1);
    expect(combinations[0].length).toBe(3);
    expect(combinations[0][0].name).toBe('ace');
    expect(combinations[0][0].suit).toBe('spades');
    expect(combinations[0][1].name).toBe('ten');
    expect(combinations[0][1].suit).toBe('spades');
    expect(combinations[0][2].name).toBe('king');
    expect(combinations[0][2].suit).toBe('spades');
    expect(combinations[0][2].opened).toBe(true);

    expect(playersRecs[1].id).toBe('b');
    expect(playersRecs[1].name).toBe('Julia');
    expect(playersRecs[1].player.fines).toEqual([{ name: 'Byte', value: 0 }]);

    const { ownCards } = playersRecs[1].player;
    expect(ownCards[0].name).toBe('ace');
    expect(ownCards[0].suit).toBe('spades');
    expect(ownCards[1].name).toBe('ten');
    expect(ownCards[1].suit).toBe('spades');
    expect(ownCards[2].name).toBe('king');
    expect(ownCards[2].suit).toBe('spades');
    expect(ownCards[2].opened).toBe(true);
    expect(ownCards[3].name).toBe('queen');
    expect(ownCards[3].suit).toBe('spades');
    expect(ownCards[4].name).toBe('jack');
    expect(ownCards[4].suit).toBe('spades');
    expect(ownCards[5].name).toBe('nine');
    expect(ownCards[5].suit).toBe('spades');
  });

  it(`serializes actions`, () => {
    expect(serializedGame.actions.length).toBe(5);
    expect(serializedGame.actions).toEqual([
      move,
      swapCards,
      suggestSuit,
      tradeCombinations,
      declareBella,
    ]);
  });

  it(`serializes cardsInDeck`, () => {
    const { cardsInDeck } = serializedGame;

    expect(cardsInDeck.length).toBe(3);
    expect(cardsInDeck[0].name).toBe('ace');
    expect(cardsInDeck[0].suit).toBe('spades');
    expect(cardsInDeck[1].name).toBe('ten');
    expect(cardsInDeck[1].suit).toBe('spades');
    expect(cardsInDeck[2].name).toBe('king');
    expect(cardsInDeck[2].suit).toBe('spades');
    expect(cardsInDeck[2].opened).toBe(true);
  });

  it(`serializes currentRound`, () => {
    expect(serializedGame.currentRound).toBe(1);
  });

  it(`serializes currentRoundActions`, () => {
    expect(serializedGame.currentRoundActions).toEqual([
      swapCards,
      suggestSuit,
    ]);
  });

  it(`serializes currentRoundActions`, () => {
    expect(serializedGame.currentDealer).toBe(1);
  });

  it(`serializes nextMove`, () => {
    expect(serializedGame.nextMovePlayerId).toBe('b');
  });

  it(`serializes lastWon`, () => {
    expect(serializedGame.lastWonPlayerId).toBe('a');
  });

  it(`serializes willTake`, () => {
    expect(serializedGame.willTakePlayerId).toBe('b');
  });

  it(`serializes obligatedToWin`, () => {
    expect(serializedGame.obligatedToWinPlayerId).toBe('a');
  });

  it(`serializes hasBella`, () => {
    expect(serializedGame.hasBellaPlayerId).toBe('a');
  });
});
