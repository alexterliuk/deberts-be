import { describe, expect, it } from 'vitest';
import DebertsGame from '../../client/game';
import { Player, Deck } from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA } from '../../client/data';
import canPlayerSuggestSuit from '../../client/rules/suggest-suit';
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

describe(`canPlayerSuggestSuit`, () => {
  it(`[ERR] when player suggests suit during playing (not at game start)`, () => {
    game.currentRound = 1;
    expect(canPlayerSuggestSuit(player1, 'NONE', game)).toEqual({ error: 9 });
    resetGame();
  });

  it(`[ERR] when player suggests suit at not their turn`, () => {
    expect(canPlayerSuggestSuit(player2, 'NONE', game)).toEqual({
      error: 10,
    });
  });

  it(`[ERR] when player at first stage suggests suit not equal to shown trump suit`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');

    const trumpSuit = deck.trumpSuitName as SuitNameType;
    let notTrumpSuit: SuitNameType | 'NONE' = 'NONE';

    if (trumpSuit === 'clubs') {
      notTrumpSuit = 'diamonds';
    } else if (trumpSuit === 'diamonds') {
      notTrumpSuit = 'hearts';
    } else if (trumpSuit === 'hearts') {
      notTrumpSuit = 'spades';
    } else {
      notTrumpSuit = 'clubs';
    }

    expect(canPlayerSuggestSuit(player1, notTrumpSuit, game)).toEqual({
      error: 11,
    });

    resetGame();
  });

  it(`[ERR] when player at second stage suggests suit equal to shown trump suit`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');
    addDummyActions();

    const trumpSuit = deck.trumpSuitName as SuitNameType;

    expect(canPlayerSuggestSuit(player1, trumpSuit, game)).toEqual({
      error: 12,
    });

    resetGame();
  });

  it(`[ERR] when player is dealer and at second stage suggests 'NONE' as trump suit`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');
    addDummyActions();

    expect(canPlayerSuggestSuit(player1, 'NONE', game)).toEqual({
      error: 13,
    });

    resetGame();
  });
});
