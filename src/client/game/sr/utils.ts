import { DebertsGame } from '..';
import { DebertsGameDB, Player } from '.';

export const getPlayerId = (
  player: Player,
  playersRecs: DebertsGame['playersRecs'],
) => {
  const foundPlayer = playersRecs.find(rec => rec.player === player);

  return foundPlayer?.id || 'NOT_FOUND';
};

export const validateGameDB = (gameDB: DebertsGameDB) => {
  let errorMessage = '';

  [
    { key: 'nextMovePlayerId', value: gameDB.nextMovePlayerId },
    { key: 'lastWonPlayerId', value: gameDB.lastWonPlayerId },
    { key: 'willTakePlayerId', value: gameDB.willTakePlayerId },
    { key: 'obligatedToWinPlayerId', value: gameDB.obligatedToWinPlayerId },
    { key: 'hasBellaPlayerId', value: gameDB.hasBellaPlayerId },
  ].forEach(entry => {
    if (entry.value === 'NOT_FOUND' && !errorMessage) {
      errorMessage = `${entry.key} is not player id`;
    }
  });

  return { errorMessage };
};
