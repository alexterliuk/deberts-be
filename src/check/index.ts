import {
  GameStartActionType,
  MoveActionType,
  PlayerActionType,
} from '../actions/types';
import DebertsGame from '../game';
import {
  GameStartCheckerFunctionType,
  PlayerMoveCheckerFunctionType,
} from '../rules/types';

export default class RulesChecker {
  actions: (GameStartActionType | PlayerActionType)[];
  game: DebertsGame;

  constructor(actions: PlayerActionType[], game: DebertsGame) {
    this.actions = actions;
    this.game = game;
  }

  checkGameStart(
    action: GameStartActionType,
    checker: GameStartCheckerFunctionType,
  ) {
    const result = checker(action.players);

    return result === true ? true : result.error;
  }

  checkMove(action: MoveActionType, checkers: PlayerMoveCheckerFunctionType[]) {
    const { card, playerIndex } = action;
    const { playersMap } = this.game;
    const player = playersMap[playerIndex];
    const copiedCheckers = checkers.slice();

    const { success, error } = copiedCheckers.reduce(
      (acc: { success: boolean; error: number }, checker) => {
        const result = checker(player, card, this.game);

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
}
