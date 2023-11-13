import Joi from 'joi';
import { CARD_NAMES, SUIT_NAMES } from '../data';

// CardFaceType
const cardFaceSchema = Joi.object({
  name: Joi.valid(CARD_NAMES).required(),
  suit: Joi.valid(SUIT_NAMES).required(),
}).required();

const cardFaceAndRanksForCombinationSchema = Joi.object({
  name: Joi.valid(CARD_NAMES).required(),
  suit: Joi.valid(SUIT_NAMES).required(),
  rank: Joi.number().integer().min(1).max(8).required(),
}).required();

const playerIndexSchema = Joi.number().integer().min(0).max(3).required();

// MoveCardActionType
export const moveCardSchema = Joi.object({
  type: Joi.equal('MOVE_CARD').required(),
  card: cardFaceSchema,
  playerIndex: playerIndexSchema,
});

// SwapCardsActionType
export const swapCardsSchema = Joi.object({
  type: Joi.equal('SWAP_CARDS').required(),
  card: cardFaceSchema,
  playerIndex: playerIndexSchema,
});

// SuggestSuitActionType
export const suggestSuitSchema = Joi.object({
  type: Joi.string().equal('SUGGEST_SUIT').required(),
  suit: Joi.string().valid(SUIT_NAMES).required(),
  playerIndex: playerIndexSchema,
});

// DeclareBellaActionType
export const declareBellaSchema = Joi.object({
  type: Joi.string().equal('DECLARE_BELLA').required(),
  playerIndex: playerIndexSchema,
});

// TradeCombinationsActionType
export const tradeCombinationsSchema = Joi.object({
  type: Joi.string().equal('TRADE_COMBINATIONS').required(),
  records: Joi.array().items(
    Joi.object({
      playerIndex: playerIndexSchema,
      combination: Joi.array().items(cardFaceAndRanksForCombinationSchema),
    }),
  ),
});
