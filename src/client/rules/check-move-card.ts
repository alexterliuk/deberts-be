import { MoveCardActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getPlayer } from '../../client/utils/get-player';
import {
  isPlayerTurnToMoveCard,
  doesPlayerHaveCard,
  isCardAllowedToMove,
} from '../../client/rules/move-card';

export const checkMoveCard = (
  action: MoveCardActionType,
  game: DebertsGame,
): { success?: true; error?: number } => {
  const { playerIndex, card } = action;

  const player = getPlayer(game, { index: playerIndex });

  const check1 = isPlayerTurnToMoveCard(player, card, game);

  if (check1 !== true) {
    return { error: check1.error };
  }

  const check2 = doesPlayerHaveCard(player, card, game);

  if (check2 !== true) {
    return { error: check2.error };
  }

  const check3 = isCardAllowedToMove(player, card, game);

  if (check3 !== true) {
    return { error: check3.error };
  }

  return { success: true };
};
