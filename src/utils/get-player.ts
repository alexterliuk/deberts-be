import { PlayerActionType } from '../actions/types';
import DebertsGame from '../game';

export const getPlayer = (game: DebertsGame, action: PlayerActionType) => {
  const { playersMap } = game;
  const { playerIndex } = action;

  return playersMap[playerIndex];
};
