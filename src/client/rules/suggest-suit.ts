import { Player } from '@alexterliuk/cards-on-table';
import { SuitNameType } from '../data/types';
import { DebertsGame } from '../game';
import { getCurrentDealer } from '../utils/get-current-dealer';

export default function canPlayerSuggestSuit(
  player: Player,
  suit: SuitNameType | 'NONE',
  game: DebertsGame,
) {
  const {
    actions,
    playersCount,
    currentRound,
    nextMove,
    table: {
      deck: { openedTrumpCard },
    },
  } = game;

  const hasPlayingStarted = currentRound > 0;

  if (hasPlayingStarted) {
    return { error: 9 }; // trump suit already assigned
  }

  if (nextMove !== player) {
    return { error: 10 }; // this is not player's turn to suggest suit
  }

  const isFirstStageOfSuggestingSuit = actions.length < playersCount;

  if (isFirstStageOfSuggestingSuit) {
    if (suit !== 'NONE' && suit !== openedTrumpCard?.suit) {
      return { error: 11 }; // it's only allowed to suggest suit of opened trump card in the first stage
    }

    return true;
  }

  // SECOND STAGE
  if (suit === openedTrumpCard?.suit) {
    return { error: 12 }; // can't suggest suit of the first stage
  }

  if (suit === 'NONE' && player === getCurrentDealer(game)) {
    return { error: 13 }; // player who deals must suggest suit in their turn in the second stage
  }

  return true;
}
