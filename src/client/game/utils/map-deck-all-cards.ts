import { Card, Deck } from '../types';

export const mapDeckAllCards = (deck: Deck) => {
  return deck.allCards.reduce((acc: Record<string, Card>, card) => {
    acc[`${card.name}${card.suit}`] = card;
    return acc;
  }, {});
};
