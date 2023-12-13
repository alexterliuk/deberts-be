import { Deck, DeckSR } from '../types';
import { serializeCard } from '.';

export const serializeDeck = (deck: Deck): DeckSR => {
  const allCards = deck.allCards.map(card => serializeCard(card));
  const takenCards = deck.takenCards.map(card => serializeCard(card));

  const openedTrumpCard = deck.openedTrumpCard
    ? serializeCard(deck.openedTrumpCard)
    : null;

  const suitNames = deck.suitNames;

  const suits = Object.keys(deck.suits).reduce(
    (acc: DeckSR['suits'], suitName: string) => {
      acc[suitName] = {
        name: suitName,
        cards: allCards.filter(card => card.suit === suitName),
      };

      return acc;
    },
    {},
  );

  const shuffledLastTime = deck.shuffledLastTime;
  const trumpSuitName = deck.trumpSuitName;
  const trumpSuitCardsData = deck.trumpSuitCardsData;

  const trumpCardsValues = Object.keys(deck.trumpCardsValues).reduce(
    (acc: DeckSR['trumpCardsValues'], cardName: string) => {
      acc[cardName] = {
        value: deck.trumpCardsValues[cardName].value,
        rank: deck.trumpCardsValues[cardName].rank,
      };

      return acc;
    },
    {},
  );

  return {
    allCards,
    takenCards,
    openedTrumpCard,
    suitNames,
    suits,
    shuffledLastTime,
    trumpSuitName,
    trumpSuitCardsData,
    trumpCardsValues,
  };
};
