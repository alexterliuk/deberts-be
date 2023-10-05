import {
  PlayerActionTypeEnum,
  MoveCardActionType,
  SwapCardsActionType,
  SuggestSuitActionType,
  TradeCombinationsActionType,
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

export const tradeCombinations: TradeCombinationsActionType = {
  type: PlayerActionTypeEnum.TRADE_COMBINATIONS,
  records: [
    {
      combination: [
        {
          name: 'ace',
          suit: 'spades',
          rank: 8,
        },
        {
          name: 'king',
          suit: 'spades',
          rank: 6,
        },
        {
          name: 'queen',
          suit: 'spades',
          rank: 5,
        },
      ],
      playerIndex: 0,
    },
    {
      combination: [
        {
          name: 'jack',
          suit: 'hearts',
          rank: 4,
        },
        {
          name: 'ten',
          suit: 'hearts',
          rank: 7,
        },
        {
          name: 'nine',
          suit: 'hearts',
          rank: 3,
        },
      ],
      playerIndex: 1,
    },
  ],
};

export const declareBella: DeclareBellaActionType = {
  type: PlayerActionTypeEnum.DECLARE_BELLA,
  playerIndex: 0,
  // will be check if a player has Bella and right to declare it
};
