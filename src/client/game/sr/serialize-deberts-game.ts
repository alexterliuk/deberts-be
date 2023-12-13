import { DebertsGame } from '..';
import { DebertsGameDB } from '../types';
import { getPlayerId } from '../utils';
import { serializeCard, serializePlayer, serializeTable } from '.';

export const serializeDebertsGame = (game: DebertsGame): DebertsGameDB => {
  const gamePlayersRecs = game.playersRecs;

  const table = serializeTable(game.table, gamePlayersRecs);

  const playersRecs = gamePlayersRecs.map(rec => ({
    id: rec.id,
    name: rec.name,
    player: serializePlayer(rec.player),
  }));

  const playersCount = game.playersCount;
  const actions = game.actions;
  const cardsInDeck = game.cardsInDeck.map(card => serializeCard(card));
  const points = game.points;
  const currentRound = game.currentRound;
  const currentRoundActions = game.currentRoundActions;
  const currentDealer = game.currentDealer;

  const nextMovePlayerId = getPlayerId(game.nextMove, gamePlayersRecs);
  const lastWonPlayerId = getPlayerId(game.lastWon, gamePlayersRecs);
  const willTakePlayerId = getPlayerId(game.willTake, gamePlayersRecs);
  const obligatedToWinPlayerId = getPlayerId(
    game.obligatedToWin,
    gamePlayersRecs,
  );
  const hasBellaPlayerId = game.hasBella
    ? getPlayerId(game.hasBella, gamePlayersRecs)
    : game.hasBella;

  return {
    table,
    playersRecs,
    playersCount,
    actions,
    cardsInDeck,
    points,
    currentRound,
    currentRoundActions,
    currentDealer,
    nextMovePlayerId,
    lastWonPlayerId,
    willTakePlayerId,
    obligatedToWinPlayerId,
    hasBellaPlayerId,
  };
};
