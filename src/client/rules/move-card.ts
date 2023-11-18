/* eslint-disable @typescript-eslint/no-unused-vars */
import { Player } from '@alexterliuk/cards-on-table';
import { CardFaceType } from '../actions/types';
import { DebertsGame } from '../game';

function isPlayerTurnToMoveCard(
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) {
  const { nextMove: playerWhoMovesNext } = game;
  const isAllowed = player === playerWhoMovesNext;

  return isAllowed ? true : { error: 2 };
}

function doesPlayerHaveCard(
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) {
  const hasCard =
    player.ownCards.find(c => c.name === card.name && c.suit === card.suit) !==
    undefined;

  return hasCard ? true : { error: 3 };
}

function isCardAllowedToMove(
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
  isTesting?: boolean,
) {
  const { suit } = card;

  const { ownCards } = player;
  const {
    table: {
      beatArea,
      deck: { trumpSuitName },
    },
  } = game;

  if (beatArea.length === 0) {
    return isTesting ? { success: 1 } : true;
  }

  const suitOfFirstCard = beatArea[0].cards[0].suit;

  if (suit === suitOfFirstCard) {
    return isTesting ? { success: 2 } : true;
  }

  const hasNoSameSuitAsSuitOfFirstCard = ownCards.every(
    c => c.suit !== suitOfFirstCard,
  );

  if (hasNoSameSuitAsSuitOfFirstCard) {
    if (suit === trumpSuitName) {
      return isTesting ? { success: 3 } : true;
    } else {
      const hasNoTrumpCards = ownCards.every(c => c.suit !== trumpSuitName);

      if (hasNoTrumpCards) {
        return isTesting ? { success: 4 } : true;
      }
    }
  }

  // suit !== suitOfFirstCard && ownCards doesn't have such suit
  // -- card.suit is trumpCard -> TRUE
  // -- card.suit is NOT trumpCard && ownCards doesn't have trumpCards -> TRUE

  return { error: 4 };
  // msg: player must move card with same suit as card of the starting player, or move trump card
}

export default [
  isPlayerTurnToMoveCard,
  doesPlayerHaveCard,
  isCardAllowedToMove,
];
