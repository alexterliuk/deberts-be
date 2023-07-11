import { Player } from '@alexterliuk/cards-on-table';
import DebertsGame from '../game';

export default function canPlayerDeclareBella(
  player: Player,
  game: DebertsGame,
) {
  const { hasBella } = game;

  return player === hasBella;
}
