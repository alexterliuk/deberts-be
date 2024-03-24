import { CardFaceType } from '../../data/types';
import { getPlayer } from '../../utils';
import { DebertsGame } from '../deberts-game';

export const getCardIndexInOwnCards = (
  game: DebertsGame,
  playerIndex: number,
  cardFace: CardFaceType,
) => {
  const player = getPlayer(game, { index: playerIndex });
  const cardIndex = player.ownCards.findIndex(
    c => c.name === cardFace.name && c.suit === cardFace.suit,
  );

  if (cardIndex === -1) {
    throw new Error("Card not found in player's ownCards.");
  }

  return cardIndex;
};
