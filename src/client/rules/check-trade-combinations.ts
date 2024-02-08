import { TradeCombinationsActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getPlayer } from '../../client/utils/get-player';
import { mapDeckAllCards } from '../game/utils';
import { canPlayerTradeCombination } from './trade-combinations';

export const checkTradeCombinations = (
  action: TradeCombinationsActionType,
  game: DebertsGame,
): { success?: true; error?: number } => {
  const { records } = action;

  const deckAllCardsMap = mapDeckAllCards(game.table.deck);

  const recordsWithPlayersAndCards = records.map(r => ({
    player: getPlayer(game, { index: r.playerIndex }),
    combination: r.combination.map(c => deckAllCardsMap[`${c.name}${c.suit}`]),
  }));

  const check1 = canPlayerTradeCombination(recordsWithPlayersAndCards, game);

  if (check1 !== true) {
    return { error: check1.error };
  }

  return { success: true };
};
