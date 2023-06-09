import {
  PlayerActionTypeEnum,
  MoveActionType,
  SwapActionType,
  SuggestSuitActionType,
  TradeCombinationActionType,
  DeclareBellaActionType,
} from './types';

export const move: MoveActionType = {
  type: PlayerActionTypeEnum.MOVE,
  card: {
    name: 'ace',
    suit: 'spades',
  },
  playerIndex: 0,
};

export const swapCard: SwapActionType = {
  type: PlayerActionTypeEnum.SWAP_CARD,
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
