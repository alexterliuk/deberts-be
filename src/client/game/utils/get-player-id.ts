import { DebertsGame } from '../deberts-game';
import { Player } from '../types';

export const getPlayerId = (
  player: Player,
  playersRecs: DebertsGame['playersRecs'],
) => {
  const foundPlayer = playersRecs.find(rec => rec.player === player);

  return foundPlayer?.id || 'NOT_FOUND';
};
