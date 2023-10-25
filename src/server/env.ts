import fs from 'fs';

type Env = {
  DATABASE_URL: string;
};

const readEnv = () => {
  const readFile = fs.readFileSync('src/server/env.json', 'utf8');
  let env = {} as Env;

  try {
    env = JSON.parse(readFile);
  } catch (err) {
    console.log('Error parsing JSON string:', err);
  }

  return env;
};

const env = readEnv();

export default env;
