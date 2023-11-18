import { DebertsGame } from '../game';

export const getPlayer = (game: DebertsGame, playerIndex: number) => {
  const { playersRecs } = game;

  return playersRecs[playerIndex].player;
};
