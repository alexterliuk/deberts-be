import { Player } from '@alexterliuk/cards-on-table';
import { CardFaceType } from '../actions/types';
import DebertsGame from '../game';

export type GameStartCheckerFunctionType = (
  players: (number | string)[],
) => true | { error: number };

export type PlayerMoveCheckerFunctionType = (
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) => true | { error: number };
