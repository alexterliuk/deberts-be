import { SuggestSuitActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getPlayer } from '../../client/utils/get-player';
import { canPlayerSuggestSuit } from './suggest-suit';

export const checkSuggestSuit = (
  action: SuggestSuitActionType,
  game: DebertsGame,
): { success?: true; error?: number } => {
  const { playerIndex, suit } = action;

  const player = getPlayer(game, { index: playerIndex });

  const check1 = canPlayerSuggestSuit(player, suit, game);

  if (check1 !== true) {
    return { error: check1.error };
  }

  return { success: true };
};
