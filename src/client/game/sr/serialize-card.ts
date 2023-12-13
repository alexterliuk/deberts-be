import { Card, CardSR } from '../types';

export const serializeCard = (card: Card): CardSR => ({
  name: card.name,
  value: card.value,
  suit: card.suit,
  rank: card.rank,
  opened: card.opened,
});
