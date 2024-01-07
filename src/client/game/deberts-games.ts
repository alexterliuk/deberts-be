import { DebertsGame } from './deberts-game';
import { DebertsGameDB } from './types';
import { restoreDebertsGame } from './rs';

class DebertsGames {
  games: DebertsGame[];
  gamesMap: Record<string, DebertsGame>;

  constructor() {
    this.games = [];
    this.gamesMap = {};
  }

  get(id: string) {
    return this.gamesMap[id] || null;
  }

  add(game: DebertsGame, id: string) {
    // id arg should come from an argument made by MongoDb
    const foundGame = this.games.find(g => g === game);
    if (foundGame) {
      return false;
    }

    this.gamesMap[id] = game;
    this.games.push(game);

    return true;
  }

  delete(id: string) {
    const game = this.gamesMap[id];
    if (!game) {
      return false;
    }

    this.games = this.games.filter(g => g !== game);
    delete this.gamesMap[id];

    return true;
  }

  deleteAll() {
    this.games = [];
    this.gamesMap = {};
  }

  restore(gameDB: DebertsGameDB, id: string) {
    this.delete(id);
    const game = restoreDebertsGame(gameDB);
    this.add(game, id);
  }
}

export const debertsGames = new DebertsGames();
