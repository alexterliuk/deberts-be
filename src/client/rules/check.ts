import { PlayerActionType, PlayerActionTypeEnum } from '../data/types';
import { DebertsGame } from '../game';
import { checkDeclareBella } from './check-declare-bella';
import { checkMoveCard } from './check-move-card';
import { checkSuggestSuit } from './check-suggest-suit';
import { checkSwapCards } from './check-swap-cards';
import { checkTradeCombinations } from './check-trade-combinations';

export const check = (
  action: PlayerActionType,
  game: DebertsGame,
): { error?: number; success?: boolean } => {
  switch (action.type) {
    case PlayerActionTypeEnum.DECLARE_BELLA: {
      const { error } = checkDeclareBella(action, game);
      // TODO: if error, return error not as number but as textual explanation of it
      return error ? { error } : { success: true };
    }

    case PlayerActionTypeEnum.MOVE_CARD: {
      const { error } = checkMoveCard(action, game);

      return error ? { error } : { success: true };
    }

    case PlayerActionTypeEnum.SUGGEST_SUIT: {
      const { error } = checkSuggestSuit(action, game);

      return error ? { error } : { success: true };
    }

    case PlayerActionTypeEnum.SWAP_CARDS: {
      const { error } = checkSwapCards(action, game);

      return error ? { error } : { success: true };
    }

    case PlayerActionTypeEnum.TRADE_COMBINATIONS: {
      const { error } = checkTradeCombinations(action, game);

      return error ? { error } : { success: true };
    }

    default: {
      return { success: false };
    }
  }
};
