import { DebertsGame } from '..';
import { serializeCard, serializeDeck, Table, TableSR } from '.';
import { getPlayerId } from './utils';

export const serializeTable = (
  table: Table,
  playersRecs: DebertsGame['playersRecs'],
): TableSR => {
  const deck = serializeDeck(table.deck);

  const playersCorners = table.playersCorners.map(corner => ({
    playerId: getPlayerId(corner.player, playersRecs),
    cards: corner.cards.map(card => serializeCard(card)),
    buyInCards: corner.buyInCards.map(card => serializeCard(card)),
    takes: corner.takes.map(take => take.map(card => serializeCard(card))),
  }));

  const playersBulks = table.playersBulks.map(bulk => ({
    playerId: bulk.player ? getPlayerId(bulk.player, playersRecs) : bulk.player,
    cards: bulk.cards.map(c =>
      Array.isArray(c) ? c.map(card => serializeCard(card)) : serializeCard(c),
    ),
  }));

  const beatArea = table.beatArea.map(area => ({
    playerId: getPlayerId(area.player, playersRecs),
    cards: area.cards.map(card => serializeCard(card)),
  }));

  const trumpCardCell = table.trumpCardCell
    ? serializeCard(table.trumpCardCell)
    : table.trumpCardCell;

  const discardPile = table.discardPile.map(card => serializeCard(card));

  return {
    deck,
    playersCorners,
    playersBulks,
    beatArea,
    trumpCardCell,
    discardPile,
  };
};
