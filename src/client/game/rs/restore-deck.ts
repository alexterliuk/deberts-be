import { DeckSR, Deck, Card } from '../types';
import { getCardFromDeck } from '../utils';

export const restoreDeck = (
  deckSR: DeckSR,
  deck: Deck,
  deckAllCardsMap: Record<string, Card>,
) => {
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
