import { describe, expect, it } from 'vitest';
import DebertsGame from '../../client/game';
import { Player, Deck } from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA } from '../../client/data';
import canPlayerSwapCards from '../../client/rules/swap-cards';
import { SuitNameType } from '../../client/data/types';
import {
  PlayerActionType,
  PlayerActionTypeEnum,
} from '../../client/actions/types';

const gameDeck = new Deck(DEBERTS_DATA);
const player1 = new Player(gameDeck);
const player2 = new Player(gameDeck);
const player3 = new Player(gameDeck);
const player4 = new Player(gameDeck);

const game = new DebertsGame([player1, player2, player3, player4]);
const deck = game.table.deck;

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
