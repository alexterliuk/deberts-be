import { describe, expect, it } from 'vitest';
import { DebertsGame } from '../../client/game';
import canPlayerSwapCards from '../../client/rules/swap-cards';
import {
  SuitNameType,
  PlayerActionType,
  PlayerActionTypeEnum,
} from '../../client/data/types';

const game = new DebertsGame(['a', 'b', 'c', 'd']);
const deck = game.table.deck;

const player1 = game.playersRecs[0].player;

const resetGame = () => {
  if (game.currentRound !== 0) {
    game.currentRound = 0;
  }

  if (game.actions.length > 0) {
    game.actions = [];
  }

  if (deck.trumpSuitName) {
    deck.closeTrumpCardAndHide();
    deck.clearTrumpSuit();
  }
};

const addDummyActions = (qty = 4) => {
  const dummyAction: PlayerActionType = {
    type: PlayerActionTypeEnum.SUGGEST_SUIT,
    suit: 'NONE',
    playerIndex: 0,
  };

  const actions = [dummyAction, dummyAction, dummyAction, dummyAction];

  game.actions = actions.slice(0, qty);
};

describe(`canPlayerSwapCards`, () => {
  it(`[ERR] when swaps cards during playing (not at game start)`, () => {
    game.currentRound = 1;

    expect(
      canPlayerSwapCards(player1, { name: 'ace', suit: 'diamonds' }, game),
    ).toEqual({ error: 5 });

    resetGame();
  });

  it(`[ERR] when swaps cards at second stage of suggesting suit`, () => {
    addDummyActions();

    expect(
      canPlayerSwapCards(player1, { name: 'ace', suit: 'diamonds' }, game),
    ).toEqual({ error: 6 });

    resetGame();
  });

  it(`[ERR] when swaps cards but already refused to play suit of opened trump card`, () => {
    addDummyActions(2);

    expect(
      canPlayerSwapCards(player1, { name: 'ace', suit: 'diamonds' }, game),
    ).toEqual({ error: 7 });

    resetGame();
  });

  it(`[ERR] when swaps cards not having card 7 of shown trump suit`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');

    const trumpSuit = deck.trumpSuitName as SuitNameType;

    expect(
      // player gives correct card but it's error because they don't have it in ownCards
      canPlayerSwapCards(player1, { name: 'seven', suit: trumpSuit }, game),
    ).toEqual({
      error: 8,
    });

    resetGame();
  });
});
