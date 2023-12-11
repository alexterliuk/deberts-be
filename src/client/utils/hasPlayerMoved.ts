import { Player } from '@alexterliuk/cards-on-table';
import { DebertsGame } from '../game';
import { MoveCardActionType, PlayerActionTypeEnum } from '../actions/types';
import { getPlayer } from '.';

export const hasPlayerMoved = (game: DebertsGame, player: Player) => {
  const moves = game.currentRoundActions.filter(
    action => action.type === PlayerActionTypeEnum.MOVE_CARD,
  );

  return !!moves.find(
    move =>
      getPlayer(game, { index: (move as MoveCardActionType).playerIndex }) ===
      player,
  );
};
