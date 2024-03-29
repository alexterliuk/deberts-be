import cardsOnTable from '@alexterliuk/cards-on-table';
import { Player, Card, Table, PlayerActionType } from './types';
import { DEBERTS_DATA } from '../data';
import { GameTime, createGameTime } from './utils/create-game-time';
import { createInitiatedBy } from './utils/create-initiated-by';

// EXPECTED FLOW:
// Action comes from client ->
// it is consumed by RulesChecker which checks Action against Rules (taking info for analysis from DebertsGame)

export class DebertsGame {
  meta: {
    initiatedBy: string; // id
    time: GameTime;
  };
  table: Table;
  playersRecs: { id: string; name: string; player: Player; points: number }[]; // id for anon user should be e.g. 'a', 'b' etc.
  playersCount: number;
  actions: PlayerActionType[]; // for keeping history so that rew/fwd of steps is possible
  cardsInDeck: Card[];
  currentRound: number; // 0 when trading suits, 1 etc. during actual game
  currentRoundActions: PlayerActionType[];
  currentDealer: number; // index of player in playersRecs
  nextMove: Player;
  lastWon: Player;
  willTake: Player;
  obligatedToWin: Player;
  hasBella: Player | null;

  constructor(playersIds: string[]) {
    this.meta = {
      initiatedBy: createInitiatedBy(playersIds[0]),
      time: createGameTime(),
    };
    this.table = cardsOnTable.createTable(DEBERTS_DATA, playersIds.length);
    this.playersRecs = this.table.getAllPlayers().map((player, index) => ({
      id: playersIds[index],
      name: '',
      player,
      points: 0,
    }));

    this.playersCount = Object.keys(this.playersRecs).length;
    this.actions = [];
    this.cardsInDeck = [];
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
