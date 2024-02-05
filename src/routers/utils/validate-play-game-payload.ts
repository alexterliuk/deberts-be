import { PlayerActionType } from '../../client/game/types';
import { PlayerActionTypeEnum } from '../../client/data/types';
import {
  moveCardSchema,
  swapCardsSchema,
  suggestSuitSchema,
  declareBellaSchema,
  tradeCombinationsSchema,
} from '../../client/data/schemas';

const schemas = {
  [PlayerActionTypeEnum.MOVE_CARD]: moveCardSchema,
  [PlayerActionTypeEnum.SWAP_CARDS]: swapCardsSchema,
  [PlayerActionTypeEnum.SUGGEST_SUIT]: suggestSuitSchema,
  [PlayerActionTypeEnum.DECLARE_BELLA]: declareBellaSchema,
  [PlayerActionTypeEnum.TRADE_COMBINATIONS]: tradeCombinationsSchema,
};

export const validatePlayGamePayload = (
  payload: PlayerActionType,
): Partial<{ error: string; success: true }> => {
  const schema = schemas[payload.type];

  if (!schema) {
    return { error: 'Unknown player action.' };
  }

  const error = schema.validate(payload).error;

  return error ? { error: error.details[0].message } : { success: true };
};
