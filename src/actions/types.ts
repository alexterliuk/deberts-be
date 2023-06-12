import { CardNameType, SuitNameType } from '../data/types';

export type GameStartActionType = {
  type: 'GAME_START';
  players: (number | string)[]; // number id for registered users, one-time string id for non-registered
};

export const enum PlayerActionTypeEnum {
  MOVE_CARD = 'MOVE_CARD',
  SWAP_CARDS = 'SWAP_CARDS',
  SUGGEST_SUIT = 'SUGGEST_SUIT',
  TRADE_COMBINATION = 'TRADE_COMBINATION',
  DECLARE_BELLA = 'DECLARE_BELLA',
}

export type CardFaceType = {
  name: CardNameType;
  suit: SuitNameType;
};

export type MoveCardActionType = {
  type: PlayerActionTypeEnum.MOVE_CARD;
  card: CardFaceType;
  playerIndex: number;
};

export type SwapCardsActionType = {
  type: PlayerActionTypeEnum.SWAP_CARDS;
  card: CardFaceType;
  playerIndex: number;
};

export type SuggestSuitActionType = {
  type: PlayerActionTypeEnum.SUGGEST_SUIT;
  suit: SuitNameType | 'NONE';
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

export type PlayerActionType =
  | MoveCardActionType
  | SwapCardsActionType
  | SuggestSuitActionType
  | TradeCombinationActionType
  | DeclareBellaActionType;
