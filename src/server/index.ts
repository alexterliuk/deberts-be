import Hapi from '@hapi/hapi';
import env from './env';

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
  ]);

  await server.start();

  console.log('Server running on %s', server.info.uri);
}

start();
