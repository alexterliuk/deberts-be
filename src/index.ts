import { checkGameStart, checkMoveCard } from './rules/check';
import moveCardCheckers from './rules/move-card';
import swapCardsChecker from './rules/swap-cards';
import {
  declareBella,
  move,
  suggestSuit,
  swapCard,
  tradeCombination,
} from './actions';
import DebertsGame from './game';
import table from './table';
import { cardsOnTable } from './table'; // temporary import just for seeing lib in dev console

const actions = [move, swapCard, suggestSuit, tradeCombination, declareBella];
const players = table.getAllPlayers();
const game = new DebertsGame(players);

const deberts = {
  cardsOnTable, // temporary field just for seeing lib in dev console
  table,
  game,
  actions,
  checkGameStart,
  checkMoveCard,
  moveCardCheckers,
  swapCardsChecker,
};

export default deberts;

/*

let dealt = deberts.table.deck.deal(4, 6, 2, false);
deberts.table.playersCorners[0].player.addCardToOwnCards(dealt[0][0][0], 0);
deberts.table.playersCorners[0].player.addCardToOwnCards(dealt[0][0][1], 0);

deberts.rulesChecker.checkMove({ card: { name: 'seven', suit: 'clubs' }, playerIndex: 0, type: 'MOVE' }, deberts.playerMovesCheckers);

*/
