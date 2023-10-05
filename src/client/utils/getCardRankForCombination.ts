import { CARD_RANKS_FOR_COMBINATION } from '../data';
import { CardNameType } from '../data/types';

export const getCardRankForCombination = (cardName: CardNameType) =>
  CARD_RANKS_FOR_COMBINATION[cardName];
