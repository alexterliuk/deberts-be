import { DeclareBellaActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getPlayer } from '../../client/utils/get-player';
import { canPlayerDeclareBella } from './declare-bella';

export const checkDeclareBella = (
  action: DeclareBellaActionType,
  game: DebertsGame,
): { success?: true; error?: number } => {
  const { playerIndex } = action;

  const player = getPlayer(game, { index: playerIndex });

  const check1 = canPlayerDeclareBella(player, game);

  if (check1 !== true) {
    return { error: check1.error };
  }

  return { success: true };
};
