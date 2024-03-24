import Hapi from '@hapi/hapi';
import mongodb from 'mongodb';
import { debertsGames } from '../client/game';
import { DebertsGameDB, PlayerActionType } from '../client/game/types';
import { getObjectId } from '../db/utils/get-object-id';
import { validatePlayGamePayload } from './utils/validate-play-game-payload';
import { check } from '../client/rules/check';
import { applyAction } from '../db/operations/apply-action';

const playGame = {
  name: 'playGame',
  register: async function (server: Hapi.Server, options: Hapi.ServerOptions) {
    server.route({
      method: 'POST',
      path: '/play-game/{id}',
      handler: playGameHandler,
    });
  },
};

export default playGame;

/**
 *
 *
 */
const playGameHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongodb.Db };
    params: { id: string };
    query: { check: string /* 'true' or 'false' expected */ };
    payload: PlayerActionType;
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const gameObjectId = getObjectId(req.params.id);

    if (gameObjectId === null) {
      return h.response().code(400);
    }

    const gameId = gameObjectId.toString();
    const gameDB = await req.mongo.db
      .collection('games')
      .findOne<DebertsGameDB>({ _id: gameObjectId });

    if (!gameDB) {
      return h.response().code(404);
    }

    const game =
      debertsGames.get(gameId) ||
      (() => {
        debertsGames.restore(gameDB, gameId);

        return debertsGames.get(gameId);
      })();

    const validated = validatePlayGamePayload(req.payload);

    if (validated.error) {
      return validated;
    }

    const shouldCheckRules = req.query.check === 'true' ? true : false;

    const result = shouldCheckRules
      ? check(req.payload, game)
      : { success: true, error: false };

    if (result.error) {
      return h.response({ error: result.error });
    }

    const applied = await applyAction(game, gameObjectId, req.payload);

    if (applied.error) {
      return h.response({ error: applied.error });
    } else {
      // TODO: should be one more query parameter for whether to return gameDB or undefined
      // return h.response(applied?.gameDB || undefined).code(200);
      return h.response().code(200);
    }
  } catch (err) {
    console.log(err);
    return h.response().code(500);
  }
};
