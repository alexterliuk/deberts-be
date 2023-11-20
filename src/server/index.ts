import Hapi from '@hapi/hapi';
import env from './env';
import games from '../routers/games';

// TODO: export server from this file to use it for games API (to fetch player and his name)
// ..... OR fetch via MongoClient
async function start() {
  const server: Hapi.Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });

  await server.register([
    {
      plugin: require('hapi-mongodb'),
      options: {
        url: env.DATABASE_URL,
        decorate: true,
      },
    },
    { plugin: games },
  ]);

  await server.start();

  console.log('Server running on %s', server.info.uri);
}

start();
