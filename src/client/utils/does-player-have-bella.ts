import { Card } from '@alexterliuk/cards-on-table';
import { DeclareBellaActionType } from '../actions/types';
import { BELLA_CARD_NAMES } from '../data';
import DebertsGame from '../game';
import { getPlayer } from './get-player';

export const doesPlayerHaveBella = (
  game: DebertsGame,
  action: DeclareBellaActionType,
) => {
  const { trumpSuitName } = game.table.deck;

  const player = getPlayer(game, action.playerIndex);
  const { ownCards } = player;

  const getBellaCard = (name: string) =>
    ownCards.find(card => card.suit === trumpSuitName && card.name === name);

  const cardOne = getBellaCard(BELLA_CARD_NAMES[0]);
  const cardTwo = getBellaCard(BELLA_CARD_NAMES[1]);

  return cardOne instanceof Card && cardTwo instanceof Card;
};
