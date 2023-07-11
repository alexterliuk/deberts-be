import {
  GameStartActionType,
  MoveCardActionType,
  SuggestSuitActionType,
  SwapCardsActionType,
} from '../actions/types';
import {
  GameStartCheckerFunctionType,
  MoveCardCheckerFunctionType,
  SuggestSuitCheckerFunctionType,
  SwapCardsCheckerFunctionType,
} from './types';
import DebertsGame from '../game';

export function checkGameStart(
  action: GameStartActionType,
  checker: GameStartCheckerFunctionType,
) {
  const result = checker(action.players);

  return result === true ? true : result.error;
}

export function checkMoveCard(
  action: MoveCardActionType,
  checkers: MoveCardCheckerFunctionType[],
  game: DebertsGame,
) {
  const { card, playerIndex } = action;
  const { playersMap } = game;
  const player = playersMap[playerIndex];
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
  const { card, playerIndex } = action;
  const { playersMap } = game;
  const player = playersMap[playerIndex];

  const result = checker(player, card, game);

  return result === true ? true : result.error;
}

export function checkSuggestSuit(
  action: SuggestSuitActionType,
  checker: SuggestSuitCheckerFunctionType,
  game: DebertsGame,
) {
  const { suit, playerIndex } = action;
  const { playersMap } = game;
  const player = playersMap[playerIndex];

  const result = checker(player, suit, game);

  return result === true ? true : result.error;
}
