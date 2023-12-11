import { DebertsGame } from '../game';

export const getPlayer = (
  game: DebertsGame,
  by: { index?: number; id?: string } = {},
) => {
  const { index = -1, id = '' } = by;
  const { playersRecs } = game;

  if (index !== -1) {
    const player = playersRecs[index]?.player;

    if (player === undefined) {
      throw new Error('Failed to find player by index.');
    }

    return player;
  }

  if (id !== '') {
    const player = playersRecs.find(rec => rec.id === id)?.player;

    if (player === undefined) {
      throw new Error('Failed to find player by id.');
    }

    return player;
  }

  throw new Error('Failed to find player.');
};
