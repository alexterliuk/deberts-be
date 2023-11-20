import Hapi from '@hapi/hapi';
import mongoDB from 'mongodb';
import { DebertsGame, debertsGames } from '../client/game';
import { createGameSchema } from '../client/actions/schemas';
import { serializeDebertsGame } from '../client/game/sr/serialize-deberts-game';
import { validateGameDB } from '../client/game/sr/utils';

const games = {
  name: 'games',
  register: async function (server: Hapi.Server, options: Hapi.ServerOptions) {
    server.route({
      method: 'POST',
      path: '/games',
      handler: createGameHandler,
    });

    // server.route({
    //   method: 'GET',
    //   path: '/games/{id}',
    //   handler: getGameHandler,
    // });

    // server.route({
    //   method: 'DELETE',
    //   path: '/games/{id}',
    //   handler: deleteGameHandler,
    // });
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
        gameError: 1,
        message: 'To start a game you need 2-4 players',
      };
    }

    const game = new DebertsGame(payload);
    const gameDB = serializeDebertsGame(game);
    const validatedGameDB = validateGameDB(gameDB);

    if (validatedGameDB.errorMessage) {
      return {
        DBError: 1,
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

// const getGameHandler = async (
//   req: Hapi.Request & {
//     mongo: { db: mongoDB.Db; ObjectID: FunctionConstructor };
//   },
//   h: Hapi.ResponseToolkit,
// ) => {
//   try {
//     // const id = req.params.id;
//     // const ObjectID = req.mongo.ObjectID;

//     // const game = await req.mongo.db.collection('games').findOne(
//     //   { _id: new ObjectID(id) },
//     //   {
//     //     projection: {
//     //       title: 1,
//     //       plot: 1,
//     //       cast: 1,
//     //       year: 1,
//     //       released: 1,
//     //       // _id: 0,
//     //     },
//     //   },
//     // );

//     // return game;

//     const id = req.params.id;
//     const ObjectID = req.mongo.ObjectID;

//     const game = await req.mongo.db.collection('games').findOne(
//       { _id: new ObjectID(id) },
//       {
//         projection: {
//           playersRecs: 1,
//           nextMovePlayerId: 1,
//           _id: 0,
//         },
//       },
//     );

//     console.log('===================================== GAME OBTAINED');
//     console.log(debertsGames.get(id)?.playersRecs);

//     return game;
//   } catch (err) {
//     console.log(err);
//   }
// };
