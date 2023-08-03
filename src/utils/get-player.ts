import DebertsGame from '../game';

export const getPlayer = (game: DebertsGame, playerIndex: number) => {
  const { playersMap } = game;

  return playersMap[playerIndex];
};
