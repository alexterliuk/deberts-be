import { checkMoveCard, checkSwapCards } from './rules/check';
import suggestSuitChecker from './rules/suggest-suit';
import moveCardCheckers from './rules/move-card';
import swapCardsChecker from './rules/swap-cards';
import declareBellaChecker from './rules/declare-bella';
import {
  declareBella,
  move,
  suggestSuit,
  swapCards,
  tradeCombinations,
} from '../test/game/actions-mock';
import { DebertsGame } from './game';
import table from './table';
import { cardsOnTable } from './table'; // temporary import just for seeing lib in dev console

const actions = [move, swapCards, suggestSuit, tradeCombinations, declareBella];
const game = new DebertsGame([]);

const deberts = {
  cardsOnTable, // temporary field just for seeing lib in dev console
  table,
  game,
  actions,
  checkSwapCards,
  checkMoveCard,
  suggestSuitChecker,
  swapCardsChecker,
  declareBellaChecker,
  moveCardCheckers,
};

export default deberts;

/*

let dealt = deberts.table.deck.deal(4, 6, 2, false);
deberts.table.playersCorners[0].player.addCardToOwnCards(dealt[0][0][0], 0);
deberts.table.playersCorners[0].player.addCardToOwnCards(dealt[0][0][1], 0);

deberts.rulesChecker.checkMove({ card: { name: 'seven', suit: 'clubs' }, playerIndex: 0, type: 'MOVE' }, deberts.playerMovesCheckers);

*/
