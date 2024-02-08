import { SwapCardsActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getPlayer } from '../../client/utils/get-player';
import { canPlayerSwapCards } from './swap-cards';

export const checkSwapCards = (
  action: SwapCardsActionType,
  game: DebertsGame,
): { success?: true; error?: number } => {
  const { playerIndex, card } = action;

  const player = getPlayer(game, { index: playerIndex });

  const check1 = canPlayerSwapCards(player, card, game);

  if (check1 !== true) {
    return { error: check1.error };
  }

  return { success: true };
};
