import mongodb from 'mongodb';
import { client } from '..';
import { SuggestSuitActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getNextPlayer } from '../../client/utils/get-next-player';

export const applySuggestSuit = async (
  game: DebertsGame,
  gameId: mongodb.BSON.ObjectId,
  action: SuggestSuitActionType,
) => {
  try {
    const { playerIndex } = action;
    const { nextPlayer, nextPlayerId } = getNextPlayer(
      game,
      playerIndex,
      action,
    );

    const shouldUpdateNextMove = nextPlayer !== null;

    const db = client.db();

    await db.collection('games').updateOne(
      { _id: gameId },
      {
        $push: {
          actions: action,
          currentRoundActions: action,
        },
        ...(shouldUpdateNextMove
          ? { $set: { nextMovePlayerId: nextPlayerId } }
          : {}),
      },
    );

    game.actions.push(action);
    game.currentRoundActions.push(action);

    if (shouldUpdateNextMove) {
      game.nextMove = nextPlayer;
    }

    // TODO:
    // - SHOULD I RETURN <{ success: true, nextMove: playerId }>???
    // - OR there'll be outer function with switch to get needed fields based on the action type
    // in final else block of playGameHandler???
    return { success: true };
  } catch (e) {
    console.log(`ERROR -2 [applyAction]:\n${e}`);
    // TODO: return a unified object with status of applying action --- UPDATE_FAILED
    return { error: -2 };
  }
};
