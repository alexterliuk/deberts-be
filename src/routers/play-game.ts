import Hapi from '@hapi/hapi';
import mongoDB from 'mongodb';
import { DebertsGame, debertsGames } from '../client/game';
import { DebertsGameDB, PlayerActionType } from '../client/game/types';
import { getObjectId } from '../db/utils/get-object-id';
import { PlayerActionTypeEnum } from '../client/data/types';
import { validatePlayGamePayload } from './utils/validate-play-game-payload';

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
    mongo: { db: mongoDB.Db };
    params: { id: string };
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
    let game = debertsGames.get(gameId);

    if (game === null) {
      const gameDB = await req.mongo.db
        .collection('games')
        .findOne<DebertsGameDB>({ _id: gameObjectId });

      if (gameDB) {
        debertsGames.restore(gameDB, gameId);
        game = debertsGames.get(gameId);
      } else {
        h.response().code(404);
      }
    }

    const payload = req.payload;

    const validated = validatePlayGamePayload(payload);

    return validated;
  } catch (err) {
    console.log(err);
    return h.response().code(500);
  }
};
