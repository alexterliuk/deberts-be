import { CardNameType, SuitNameType } from '../data/types';

export type GameStartActionType = {
  type: 'GAME_START';
  players: (number | string)[]; // number id for registered users, one-time string id for non-registered
};

export const enum PlayerActionTypeEnum {
  MOVE = 'MOVE',
  SWAP_CARD = 'SWAP_CARD',
  SUGGEST_SUIT = 'SUGGEST_SUIT',
  TRADE_COMBINATION = 'TRADE_COMBINATION',
  DECLARE_BELLA = 'DECLARE_BELLA',
}

export type CardFaceType = {
  name: CardNameType;
  suit: SuitNameType;
};

export type MoveActionType = {
  type: PlayerActionTypeEnum.MOVE;
  card: CardFaceType;
  playerIndex: number;
};

export type SwapActionType = {
  type: PlayerActionTypeEnum.SWAP_CARD;
  card: CardFaceType;
  playerIndex: number;
};

export type SuggestSuitActionType = {
  type: PlayerActionTypeEnum.SUGGEST_SUIT;
  suit: SuitNameType;
  playerIndex: number;
};

export type TradeCombinationActionType = {
  type: PlayerActionTypeEnum.TRADE_COMBINATION;
  combination: CardFaceType[];
  playerIndex: number;
};

export type DeclareBellaActionType = {
  type: PlayerActionTypeEnum.DECLARE_BELLA;
  playerIndex: number;
};

// export type PlayerActionType =
//   | MoveActionType
//   | SwapActionType
//   | SuggestSuitActionType
//   | TradeCombinationActionType
//   | DeclareBellaActionType;
