import { Card, CardSR } from '../types';

export const getCardFromDeck = (
  cardSR: CardSR,
  deckAllCardsMap: Record<string, Card>,
) => {
  const card = deckAllCardsMap[`${cardSR.name}${cardSR.suit}`];

  if (card === undefined) {
    throw new Error('Card not found in deck.');
  }

  return card;
};
