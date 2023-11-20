import { Card, CardSR } from '.';

export const serializeCard = (card: Card): CardSR => ({
  name: card.name,
  value: card.value,
  suit: card.suit,
  rank: card.rank,
  opened: card.opened,
});
