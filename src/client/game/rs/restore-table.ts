import { getPlayer } from '../../utils';
import { DebertsGame } from '..';
import { Card, DebertsGameDB } from '../types';
import { getCardFromDeck } from '../utils';
import { restoreDeck } from '.';

export const restoreTable = (
  gameDB: DebertsGameDB,
  game: DebertsGame,
  deckAllCardsMap: Record<string, Card>,
) => {
  const { deck } = game.table;
  const { deck: deckSR } = gameDB.table;

  restoreDeck(deckSR, deck, deckAllCardsMap);

  game.table.playersCorners = gameDB.table.playersCorners.map(cornerSR => ({
    player: getPlayer(game, {
      id: cornerSR.playerId,
    }),

    cards: cornerSR.cards.map(cardSR =>
      getCardFromDeck(cardSR, deckAllCardsMap),
    ),

    buyInCards: cornerSR.buyInCards.map(cardSR =>
      getCardFromDeck(cardSR, deckAllCardsMap),
    ),

    takes: cornerSR.takes.map(takeSR =>
      takeSR.map(cardSR => getCardFromDeck(cardSR, deckAllCardsMap)),
    ),
  }));

  game.table.playersBulks = gameDB.table.playersBulks.map(bulk => ({
    player:
      bulk.playerId === null ? null : getPlayer(game, { id: bulk.playerId }),

    cards: bulk.cards.map(entry =>
      Array.isArray(entry)
        ? entry.map(cardSR => getCardFromDeck(cardSR, deckAllCardsMap))
        : getCardFromDeck(entry /* is cardSR */, deckAllCardsMap),
    ),
  }));

  game.table.beatArea = gameDB.table.beatArea.map(areaSR => ({
    player: getPlayer(game, { id: areaSR.playerId }),
    cards: areaSR.cards.map(cardSR => getCardFromDeck(cardSR, deckAllCardsMap)),
  }));

  game.table.trumpCardCell =
    gameDB.table.trumpCardCell === null
      ? null
      : getCardFromDeck(gameDB.table.trumpCardCell, deckAllCardsMap);

  game.table.discardPile = gameDB.table.discardPile.map(cardSR =>
    getCardFromDeck(cardSR, deckAllCardsMap),
  );
};
