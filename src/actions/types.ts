import { Card } from '@alexterliuk/cards-on-table';
import { CardNameType, SuitNameType } from '../data/types';

export type GameStartActionType = {
  type: 'GAME_START';
  players: (number | string)[]; // number id for registered users, one-time string id for non-registered
};

export const enum PlayerActionTypeEnum {
  MOVE_CARD = 'MOVE_CARD',
  SWAP_CARDS = 'SWAP_CARDS',
  SUGGEST_SUIT = 'SUGGEST_SUIT',
  TRADE_COMBINATIONS = 'TRADE_COMBINATIONS',
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

export type DeclareBellaActionType = {
  type: PlayerActionTypeEnum.DECLARE_BELLA;
  playerIndex: number;
};

// Action with data from more than one player
// There'll be one request from the client with data obtained from each player who trades
export type TradeCombinationsActionType = {
  type: PlayerActionTypeEnum.TRADE_COMBINATIONS;
  records: {
    playerIndex: number;
    combination: (CardFaceType & Pick<Card, 'rank'>)[];
  }[];
};

export type PlayerActionType =
  | MoveCardActionType
  | SwapCardsActionType
  | SuggestSuitActionType
  | DeclareBellaActionType
  | TradeCombinationsActionType;
