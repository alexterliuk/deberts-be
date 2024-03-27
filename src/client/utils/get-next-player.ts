import { PlayerActionTypeEnum } from '../data/types';
import { DebertsGame } from '../game';
import { PlayerActionType } from '../game/types';

export const getNextPlayer = (
  game: DebertsGame,
  playerIndex: number,
  action: PlayerActionType,
) => {
  const { playersRecs } = game;

  const playersQty = playersRecs.length;
  const nextPlayerIndex = playerIndex === playersQty - 1 ? 0 : playerIndex + 1;
  const nextPlayerId = playersRecs[nextPlayerIndex].id;
  const nextPlayer = playersRecs[nextPlayerIndex].player;

  const playerResult = {
    nextPlayerIndex,
    nextPlayerId,
    nextPlayer,
  };

  const noPlayerResult = {
    nextPlayerIndex: -1,
    nextPlayerId: '',
    nextPlayer: null,
  };

  switch (action.type) {
    case PlayerActionTypeEnum.MOVE_CARD: {
      const isGameRoundEnd = nextPlayer.ownCards.length === 0;

      return isGameRoundEnd ? noPlayerResult : playerResult;
    }

    case PlayerActionTypeEnum.SUGGEST_SUIT: {
      const suggestSuitActionsCount = game.actions.filter(
        ({ type }) => type === PlayerActionTypeEnum.SUGGEST_SUIT,
      ).length;

      const isSuitsTradingEnd = suggestSuitActionsCount === playersQty * 2 - 1;

      return isSuitsTradingEnd ? noPlayerResult : playerResult;
    }

    default: {
      return playerResult;
    }
  }
};
