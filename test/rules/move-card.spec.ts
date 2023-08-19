import { describe, expect, it } from 'vitest';
import DebertsGame from '../../src/game';
import { Player, Deck } from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA } from '../../src/data';
import moveCardCheckers from '../../src/rules/move-card';
import { SuitNameType } from '../../src/data/types';
import { CardFaceType } from '../../src/actions/types';

const [
  isPlayerTurnToMoveCard,
  doesPlayerHaveCard,
  isCardAllowedToMove,
] = moveCardCheckers;

const gameDeck = new Deck(DEBERTS_DATA);
const deckCardsQty = gameDeck.allCards.length;
const player1 = new Player(gameDeck);
const player2 = new Player(gameDeck);
const player3 = new Player(gameDeck);
const player4 = new Player(gameDeck);

const game = new DebertsGame([player1, player2, player3, player4]);
const deck = game.table.deck;
const table = game.table;

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

  if (player1.ownCards.length > 0) {
    player1.ownCards = [];
  }

  if (player2.ownCards.length > 0) {
    player2.ownCards = [];
  }

  if (player3.ownCards.length > 0) {
    player3.ownCards = [];
  }

  if (player4.ownCards.length > 0) {
    player4.ownCards = [];
  }

  if (deck.allCards.length !== deckCardsQty) {
    deck.returnAllCardsToDeck();
  }

  if (table.beatArea.length > 0) {
    table.beatArea = [];
  }
};

describe(`isPlayerTurnToMoveCard`, () => {
  it(`[ERR] when player moves at not their turn`, () => {
    game.nextMove = player1;

    expect(
      isPlayerTurnToMoveCard(player2, { name: 'ace', suit: 'diamonds' }, game),
    ).toEqual({ error: 2 });

    resetGame();
  });
});

describe(`doesPlayerHaveCard`, () => {
  it(`[ERR] when player moves with a card they don't have`, () => {
    const dealt = deck.deal(4, 6, 2);
    player1.ownCards = dealt[0][0];

    expect(
      doesPlayerHaveCard(
        player2,
        {
          name: player1.ownCards[0].name,
          suit: player1.ownCards[0].suit,
        } as CardFaceType,
        game,
      ),
    ).toEqual({
      error: 3,
    });

    resetGame();
  });
});

describe(`isCardAllowedToMove`, () => {
  it(`[PASS] when player moves first in the game round`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');

    expect(
      isCardAllowedToMove(
        player1,
        { name: 'eight', suit: 'diamonds' },
        game,
        true,
      ),
    ).toEqual({ success: 1 });

    resetGame();
  });

  it(`[PASS] when player moves with a card with suit equal to suit of the first card in beat area`, () => {
    deck.openTrumpCard();
    deck.assignTrumpSuit(deck.openedTrumpCard?.suit ?? '');
    table.addCardToBeatArea(deck.allCards[0], player1);

    const suitOfFirstCard = table.beatArea[0].cards[0].suit;

    expect(
      isCardAllowedToMove(
        player1,
        { name: 'eight', suit: suitOfFirstCard as SuitNameType },
        game,
        true,
      ),
    ).toEqual({ success: 2 });

    resetGame();
  });

  it(`[PASS] when player moves with a card with trump suit not having card with suit equal to suit of the first card in beat area`, () => {
    const dealt = deck.deal(4, 6, 2);
    deck.assignTrumpSuit('spades');

    const trumpSuit = deck.trumpSuitName as SuitNameType;
    player2.ownCards = dealt[0][0].map(card => ((card.suit = trumpSuit), card));

    table.addCardToBeatArea(deck.takenCards[0], player1);
    let notTrumpSuit: SuitNameType;

    if (trumpSuit === 'clubs') {
      notTrumpSuit = 'diamonds';
    } else if (trumpSuit === 'diamonds') {
      notTrumpSuit = 'hearts';
    } else if (trumpSuit === 'hearts') {
      notTrumpSuit = 'spades';
    } else {
      notTrumpSuit = 'clubs';
    }

    table.beatArea[0].cards[0].suit = notTrumpSuit;

    expect(
      isCardAllowedToMove(
        player2,
        { name: 'eight', suit: trumpSuit },
        game,
        true,
      ),
    ).toEqual({ success: 3 });

    resetGame();
  });

  it(`[PASS] when player moves with any card having neither trump suit, nor suit equal to suit of the first card in beat area`, () => {
    const dealt = deck.deal(4, 6, 2);
    deck.assignTrumpSuit('spades');

    const trumpSuit = deck.trumpSuitName as SuitNameType;

    table.addCardToBeatArea(deck.takenCards[0], player1);
    let notTrumpSuit: SuitNameType;

    if (trumpSuit === 'clubs') {
      notTrumpSuit = 'diamonds';
    } else if (trumpSuit === 'diamonds') {
      notTrumpSuit = 'hearts';
    } else if (trumpSuit === 'hearts') {
      notTrumpSuit = 'spades';
    } else {
      notTrumpSuit = 'clubs';
    }

    const suitNames: SuitNameType[] = ['clubs', 'diamonds', 'hearts', 'spades'];
    const notTrumpSuit2 = suitNames.find(
      name => name !== trumpSuit && name !== notTrumpSuit,
    ) as SuitNameType;

    table.beatArea[0].cards[0].suit = notTrumpSuit;

    player2.ownCards = dealt[0][0].map(
      card => ((card.suit = notTrumpSuit2), card),
    );

    expect(
      isCardAllowedToMove(
        player2,
        { name: 'eight', suit: notTrumpSuit2 },
        game,
        true,
      ),
    ).toEqual({ success: 4 });

    resetGame();
  });
});
