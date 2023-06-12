import {
  PlayerActionTypeEnum,
  MoveCardActionType,
  SwapCardsActionType,
  SuggestSuitActionType,
  TradeCombinationActionType,
  DeclareBellaActionType,
} from './types';

export const move: MoveCardActionType = {
  type: PlayerActionTypeEnum.MOVE_CARD,
  card: {
    name: 'ace',
    suit: 'spades',
  },
  playerIndex: 0,
};

export const swapCards: SwapCardsActionType = {
  type: PlayerActionTypeEnum.SWAP_CARDS,
  card: {
    name: 'nine',
    suit: 'spades',
  },
  playerIndex: 0,
  // will be check if a player has card "7 spades" and right to swap
};

export const suggestSuit: SuggestSuitActionType = {
  type: PlayerActionTypeEnum.SUGGEST_SUIT,
  suit: 'spades',
  playerIndex: 0,
};

export const tradeCombination: TradeCombinationActionType = {
  type: PlayerActionTypeEnum.TRADE_COMBINATION,
  combination: [
    {
      name: 'ace',
      suit: 'spades',
    },
    {
      name: 'king',
      suit: 'spades',
    },
    {
      name: 'queen',
      suit: 'spades',
    },
  ],
  playerIndex: 0,
};

export const declareBella: DeclareBellaActionType = {
  type: PlayerActionTypeEnum.DECLARE_BELLA,
  playerIndex: 0,
  // will be check if a player has Bella and right to declare it
};
