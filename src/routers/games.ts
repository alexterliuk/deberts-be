import Hapi from '@hapi/hapi';
import mongoDB from 'mongodb';
import { DebertsGame, debertsGames } from '../client/game';
import { createGameSchema } from '../client/actions/schemas';
import { serializeDebertsGame } from '../client/game/sr/serialize-deberts-game';
import { addPlayersNames, validateGameDB } from '../client/game/utils';
import { DebertsGameDB } from '../client/game/types';
import { GameRecord, convertGameRecord } from './utils/convert-game-record';

const games = {
  name: 'games',
  register: async function (server: Hapi.Server, options: Hapi.ServerOptions) {
    server.route({
      method: 'POST',
      path: '/games',
      handler: createGameHandler,
    });

    server.route({
      method: 'GET',
      path: '/games/{id}',
      handler: getGameHandler,
    });

    server.route({
      method: 'DELETE',
      path: '/games/{id}',
      handler: deleteGameHandler,
    });

    server.route({
      method: 'GET',
      path: '/games/{id}/record',
      handler: getGameRecordHandler,
    });

    server.route({
      method: 'GET',
      path: '/games/records',
      handler: getGameRecordsHandler,
    });
  },
};

export default games;

/**
 * For starting a game client sends string[]:
 * - real id will correspond to real user (real id in db);
 * - another string will correspond to anonymous user.
 * Anonymous user will receive random name by making use of ChatGPT API.
 */
const createGameHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongoDB.Db };
    payload: string[];
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const payload = req.payload;
    const validated = createGameSchema.validate(payload);
    if (validated.error) {
      return {
        gameError: 1.1,
        message: 'To start a game you need 2-4 players',
      };
    }

    const game = new DebertsGame(payload);
    const added = await addPlayersNames(game);
    if (added.errorMessage) {
      return {
        DBError: 1.1,
        message: added.errorMessage,
      };
    }

    const gameDB = serializeDebertsGame(game);
    const validatedGameDB = validateGameDB(gameDB);
    if (validatedGameDB.errorMessage) {
      return {
        DBError: 1.2,
        message: validatedGameDB.errorMessage,
      };
    }

    const result = await req.mongo.db.collection('games').insertOne(gameDB);

    const id = result.insertedId.toString();
    debertsGames.add(game, id);

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *
 *
 */
const getGameHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongoDB.Db; ObjectID: FunctionConstructor };
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const id = req.params.id;
    const ObjectID = req.mongo.ObjectID;

    const gameDB = await req.mongo.db
      .collection('games')
      .findOne<DebertsGameDB>({ _id: new ObjectID(id) });

    if (gameDB) {
      debertsGames.restore(gameDB, id);
    }

    return gameDB || h.response().code(404);
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 *
 */
const deleteGameHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongoDB.Db; ObjectID: FunctionConstructor };
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const id = req.params.id;
    const ObjectID = req.mongo.ObjectID;

    await req.mongo.db
      .collection('games')
      .findOneAndDelete({ _id: new ObjectID(id) });

    return h.response().code(204);
  } catch (err) {
    console.log(err);
  }
};

/**
 * TODO: create DebertsGameRecord class:
 *   initiatedBy: id string
 *   time: {
 *     startedAt: DateTime string,
 *     finishedAt: DateTime string or empty string (not finished)
 *     pausedAt: DateTime string or empty string (finished)
 *   }
 * AND return DebertsGameRecord by getGameRecordHandler
 */
const getGameRecordHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongoDB.Db; ObjectID: FunctionConstructor };
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const id = req.params.id;
    const ObjectID = req.mongo.ObjectID;

    const result = await req.mongo.db
      .collection('games')
      .findOne<{ playersRecs: GameRecord }>(
        { _id: new ObjectID(id) },
        {
          projection: {
            playersRecs: {
              id: 1,
              name: 1,
              player: {
                fines: 1,
                bonuses: 1,
              },
              points: 1,
            },
            _id: 0,
          },
        },
      );

    return result ? convertGameRecord(result.playersRecs) : [];
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 *
 */
const getGameRecordsHandler = async (
  req: Hapi.Request & {
    mongo: { db: mongoDB.Db; ObjectID: FunctionConstructor };
  },
  h: Hapi.ResponseToolkit,
) => {
  try {
    const offset = Number(req.query.offset) || 0;

    const result = await req.mongo.db
      .collection('games')
      .find<{ playersRecs: GameRecord; _id: string }>(
        {},
        {
          projection: {
            playersRecs: {
              id: 1,
              name: 1,
              player: {
                fines: 1,
                bonuses: 1,
              },
              points: 1,
            },
            _id: 1,
          },
        },
      )
      // .sort({ metacritic: -1 })
      .skip(offset)
      .limit(20)
      .toArray();

    return result.map(r => convertGameRecord(r.playersRecs, r._id));
  } catch (err) {
    console.log(err);
  }
};
