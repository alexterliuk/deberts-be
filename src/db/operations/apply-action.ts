import mongodb from 'mongodb';
import { PlayerActionType } from '../../client/game/types';
import { DebertsGame } from '../../client/game';
import { PlayerActionTypeEnum } from '../../client/data/types';
import { applyDeclareBella } from './apply-declare-bella';
import { applyMoveCard } from './apply-move-card';

export const applyAction = async (
  game: DebertsGame,
  gameId: mongodb.BSON.ObjectId,
  action: PlayerActionType,
) => {
  switch (action.type) {
    case PlayerActionTypeEnum.DECLARE_BELLA: {
      return await applyDeclareBella(game, gameId, action);
    }

    case PlayerActionTypeEnum.MOVE_CARD: {
      return await applyMoveCard(game, gameId, action);
    }

    default: {
      console.log('action not implemented');
      // TODO: change error
      return { error: -100 };
    }
  }
};
