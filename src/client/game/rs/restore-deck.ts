import { DeckSR, Deck, Card } from '../types';
import { getCardFromDeck } from '../utils';

export const restoreDeck = (
  deckSR: DeckSR,
  deck: Deck,
  deckAllCardsMap: Record<string, Card>,
) => {
  deckSR.allCards.forEach(cardSR => {
    if (cardSR.opened) {
      const id = `${cardSR.name}${cardSR.suit}`;
      const card = deckAllCardsMap[id];

      const isSameCard = cardSR.name === card.name && cardSR.suit === card.suit;
      if (isSameCard) {
        card.opened = true;
      } else {
        throw new Error('Failed to open card as it is not found.');
      }
    }
  });

  const openedTrumpCardSR = deckSR.openedTrumpCard;
  if (openedTrumpCardSR) {
    const card = getCardFromDeck(openedTrumpCardSR, deckAllCardsMap);
    deck.openedTrumpCard = card;
  }

  deck.shuffledLastTime = deckSR.shuffledLastTime;

  if (deckSR.takenCards.length !== 0) {
    deck.takenCards = deckSR.takenCards.map(cardSR =>
      getCardFromDeck(cardSR, deckAllCardsMap),
    );
  }

  deck.trumpSuitName = deckSR.trumpSuitName;
};
