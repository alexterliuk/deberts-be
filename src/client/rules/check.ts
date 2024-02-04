import {
  DeclareBellaActionType,
  MoveCardActionType,
  SuggestSuitActionType,
  SwapCardsActionType,
  TradeCombinationsActionType,
} from '../data/types';
import {
  DeclareBellaCheckerFunctionType,
  MoveCardCheckerFunctionType,
  SuggestSuitCheckerFunctionType,
  SwapCardsCheckerFunctionType,
  TradeCombinationsCheckerFunctionType,
} from './types';
import { DebertsGame } from '../game';
import { getPlayer } from '../utils/get-player';

export function checkMoveCard(
  action: MoveCardActionType,
  checkers: MoveCardCheckerFunctionType[],
  game: DebertsGame,
) {
  const { card } = action;
  const player = getPlayer(game, { index: action.playerIndex });
  const copiedCheckers = checkers.slice();

  const { success, error } = copiedCheckers.reduce(
    (acc: { success: boolean; error: number }, checker) => {
      const result = checker(player, card, game);

      acc.success = result === true;
      if (result !== true) {
        acc = {
          success: false,
          error: result.error,
        };
        copiedCheckers.length = 0;
      }

      return acc;
    },
    { success: false, error: -1 },
  );

  return success || error;
}

export function checkSwapCards(
  action: SwapCardsActionType,
  checker: SwapCardsCheckerFunctionType,
  game: DebertsGame,
) {
  const { card } = action;

  const player = getPlayer(game, { index: action.playerIndex });
  const result = checker(player, card, game);

  return result === true ? true : result.error;
}

export function checkSuggestSuit(
  action: SuggestSuitActionType,
  checker: SuggestSuitCheckerFunctionType,
  game: DebertsGame,
) {
  const { suit } = action;

  const player = getPlayer(game, { index: action.playerIndex });
  const result = checker(player, suit, game);

  return result === true ? true : result.error;
}

export function checkDeclareBella(
  action: DeclareBellaActionType,
  checker: DeclareBellaCheckerFunctionType,
  game: DebertsGame,
) {
  const player = getPlayer(game, { index: action.playerIndex });
  const result = checker(player, game);

  return result === true ? true : result.error;
}

export function checkTradeCombinations(
  action: TradeCombinationsActionType,
  checker: TradeCombinationsCheckerFunctionType,
  game: DebertsGame,
) {
  const records = action.records.map(record => ({
    player: getPlayer(game, { index: record.playerIndex }),
    combination: record.combination,
  }));

  const result = checker(records, game);

  return result;
}
