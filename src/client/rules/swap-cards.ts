import { Player } from '@alexterliuk/cards-on-table';
import { CardFaceType, PlayerActionTypeEnum } from '../data/types';
import { DebertsGame } from '../game';

export function canPlayerSwapCards(
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) {
  const {
    actions,
    playersRecs,
    playersCount,
    currentRound,
    table: {
      deck: { openedTrumpCard },
    },
  } = game;

  const hasPlayingStarted = currentRound > 0;

  if (hasPlayingStarted) {
    return { error: 5 }; // swapping of cards only allowed when playing has not started yet
  }

  const isFirstStageOfSuggestingSuit = actions.length < playersCount;

  if (!isFirstStageOfSuggestingSuit) {
    return { error: 6 }; // swapping of cards not allowed at second stage
  }

  const hasRefusedToPlaySuitOfOpenedTrumpCard = actions.find(
    a =>
      a.type === PlayerActionTypeEnum.SUGGEST_SUIT &&
      a.suit === 'NONE' &&
      playersRecs[a.playerIndex].player === player,
  );

  if (hasRefusedToPlaySuitOfOpenedTrumpCard) {
    return { error: 7 }; // swapping not allowed as player has already said 'pas' for suit of opened trump card
  }

  const hasCardSevenOfCorrectSuit =
    player.ownCards.find(
      c => c.name === 'seven' && c.suit === openedTrumpCard?.suit,
    ) !== undefined;

  if (!hasCardSevenOfCorrectSuit) {
    return { error: 8 };
  }

  return true;
}
