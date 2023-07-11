import { Player, Card, Table } from '@alexterliuk/cards-on-table';
// import deberts from '..';
import table from '../table';
import { PlayerActionType } from '../actions/types';

// const { table } = deberts;

// EXPECTED FLOW:
// Action comes from client ->
// it is consumed by RulesChecker which checks Action against Rules (taking info for analysis from DebertsGame)

export default class DebertsGame {
  playersMap: Record<number, Player>;
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
  // currentDealer: number;
  // rounds: string[];
  table: Table;

  constructor(players: Player[]) {
    this.playersMap = players.reduce(
      (acc: Record<number, Player>, player, index) => {
        acc[index] = player;
        return acc;
      },
      {},
    );
    this.playersCount = Object.keys(this.playersMap).length;
    this.actions = [];
    this.nextMove = this.playersMap[0];
    this.cardsInDeck = [];
    this.points = [];
    this.lastWon = this.playersMap[0];
    this.willTake = this.playersMap[0];
    this.obligatedToWin = this.playersMap[0];
    this.hasBella = null; // doesPlayerHaveBella will be called when game starts (currentRound 1)
    this.currentRound = 0;
    // this.currentDealer = 0;
    this.table = table;
  }
}

// // @ts-ignore
// console.log('BLA');
