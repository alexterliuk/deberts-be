import { Player, Card, Suit, Deck, Table } from '@alexterliuk/cards-on-table';
// import deberts from '..';
import table from '../table';

// const { table } = deberts;

// EXPECTED FLOW:
// Action comes from client ->
// it is consumed by RulesChecker which checks Action against Rules (taking info for analysis from DebertsGame)

export default class DebertsGame {
  playersMap: Record<number, Player>;
  actions: string[]; // for keeping history so that rew/fwd of steps is possible
  nextMove: Player;
  cardsInDeck: Card[];
  points: number[];
  lastWon: Player;
  willTake: Player;
  // currentRound: number;
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
    this.actions = [];
    this.nextMove = this.playersMap[0];
    this.cardsInDeck = [];
    this.points = [];
    this.lastWon = this.playersMap[0];
    this.willTake = this.playersMap[0];
    this.table = table;
  }
}
