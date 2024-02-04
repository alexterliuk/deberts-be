import { Card, Player } from '@alexterliuk/cards-on-table';
import { DebertsGame } from '../game';
import { CardFaceType, SuitNameType } from '../data/types';

export type MoveCardCheckerFunctionType = (
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) => true | { error: number };

export type SwapCardsCheckerFunctionType = (
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) => true | { error: number };

export type SuggestSuitCheckerFunctionType = (
  player: Player,
  suit: SuitNameType | 'NONE',
  game: DebertsGame,
) => true | { error: number };

export type DeclareBellaCheckerFunctionType = (
  player: Player,
  game: DebertsGame,
) => true | { error: number };

export type TradeCombinationsCheckerFunctionType = (
  records: {
    player: Player;
    combination: (CardFaceType & Pick<Card, 'rank'>)[];
  }[],
  game: DebertsGame,
) =>
  | { player: Player; combination: CardFaceType[]; win: boolean }[]
  | { error: number };
