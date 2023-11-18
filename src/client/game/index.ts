import cardsOnTable, { Player, Card, Table } from '@alexterliuk/cards-on-table';
import { PlayerActionType } from '../actions/types';
import { DEBERTS_DATA } from '../data';

// EXPECTED FLOW:
// Action comes from client ->
// it is consumed by RulesChecker which checks Action against Rules (taking info for analysis from DebertsGame)

export class DebertsGame {
  table: Table;
  playersRecs: { id: string; name: string; player: Player }[]; // id for anon user should be e.g. 'a', 'b' etc.
  playersCount: number;
  actions: PlayerActionType[]; // for keeping history so that rew/fwd of steps is possible
  nextMove: Player;
  cardsInDeck: Card[];
  points: number[];
  lastWon: Player;
  willTake: Player;
  obligatedToWin: Player;
  hasBella: Player | null;
  currentRound: number; // 0 when trading suits, 1 etc. during actual game
  currentRoundActions: PlayerActionType[];
  // currentDealer: number; // index of player in playersRecs

  constructor(playersIds: string[]) {
    this.table = cardsOnTable.createTable(DEBERTS_DATA, playersIds.length);
    this.playersRecs = this.table
      .getAllPlayers()
      /* name prop should be get from accessing mongodb via MongoClient.connect... */
      .map((player, index) => ({ id: playersIds[index], name: '', player }));
    this.playersCount = Object.keys(this.playersRecs).length;
    this.actions = [];
    this.nextMove = this.playersRecs[0].player;
    this.cardsInDeck = [];
    this.points = [];
    this.lastWon = this.playersRecs[0].player;
    this.willTake = this.playersRecs[0].player;
    this.obligatedToWin = this.playersRecs[0].player;
    this.hasBella = null; // doesPlayerHaveBella will be called when game starts (currentRound 1)
    this.currentRound = 0;
    this.currentRoundActions = [];
    // this.currentDealer = 0;
  }
}
