import mongodb from 'mongodb';
import { client } from '..';
import {
  DeclareBellaActionType,
  PlayerActionTypeEnum,
} from '../../client/data/types';
import { DebertsGame } from '../../client/game';

export const applyDeclareBella = async (
  game: DebertsGame,
  gameId: mongodb.BSON.ObjectId,
  action: DeclareBellaActionType,
) => {
  try {
    const { playerIndex } = action;

    const bonus = {
      name: PlayerActionTypeEnum.DECLARE_BELLA,
      value: 20, // TODO: move number value to data
    };

    const db = client.db();

    await db.collection('games').updateOne(
      { _id: gameId },
      {
        $push: {
          actions: action,
          currentRoundActions: action,
          [`playersRecs.${playerIndex}.player.bonuses`]: bonus,
        },
      },
    );

    game.actions.push(action);
    game.currentRoundActions.push(action);
    game.playersRecs[playerIndex].player.bonuses.push(bonus);

    return { success: true };
  } catch (e) {
    console.log(`ERROR -2 [applyAction]:\n${e}`);
    // TODO: return a unified object with status of applying action --- UPDATE_FAILED
    return { error: -2 };
  }
};
