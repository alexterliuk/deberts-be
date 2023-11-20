import cardsOnTable, { Player, Card, Table } from '@alexterliuk/cards-on-table';
import { PlayerActionType } from '../actions/types';
import { DEBERTS_DATA } from '../data';
import { DebertsGameDB } from './sr/types';

// EXPECTED FLOW:
// Action comes from client ->
// it is consumed by RulesChecker which checks Action against Rules (taking info for analysis from DebertsGame)

export class DebertsGame {
  table: Table;
  playersRecs: { id: string; name: string; player: Player }[]; // id for anon user should be e.g. 'a', 'b' etc.
  playersCount: number;
  actions: PlayerActionType[]; // for keeping history so that rew/fwd of steps is possible
  cardsInDeck: Card[];
  points: number[];
  currentRound: number; // 0 when trading suits, 1 etc. during actual game
  currentRoundActions: PlayerActionType[];
  currentDealer: number; // index of player in playersRecs
  nextMove: Player;
  lastWon: Player;
  willTake: Player;
  obligatedToWin: Player;
  hasBella: Player | null;

  constructor(playersIds: string[]) {
    this.table = cardsOnTable.createTable(DEBERTS_DATA, playersIds.length);
    this.playersRecs = this.table
      .getAllPlayers()
      /* name prop should be get from accessing mongodb via MongoClient.connect... */
      .map((player, index) => ({ id: playersIds[index], name: '', player }));
    this.playersCount = Object.keys(this.playersRecs).length;
    this.actions = [];
    this.cardsInDeck = [];
    this.points = [];
    this.currentRound = 0;
    this.currentRoundActions = [];
    this.currentDealer = 0;
    this.nextMove = this.playersRecs[0].player;
    this.lastWon = this.playersRecs[0].player;
    this.willTake = this.playersRecs[0].player;
    this.obligatedToWin = this.playersRecs[0].player;
    this.hasBella = null; // doesPlayerHaveBella will be called when game starts (currentRound 1)
  }
}

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

  restore(gameDB: DebertsGameDB) {
    // TODO: recreate DebertsGame from data stored in db (needed when a server crashs)
    return true;
  }
}

export const debertsGames = new DebertsGames();
