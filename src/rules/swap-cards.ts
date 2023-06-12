import { Player } from '@alexterliuk/cards-on-table';
import { CardFaceType, PlayerActionTypeEnum } from '../actions/types';
import DebertsGame from '../game';

export default function canPlayerSwapCards(
  player: Player,
  card: CardFaceType,
  game: DebertsGame,
) {
  const { actions, playersMap } = game;

  const playersCount = Object.keys(playersMap).length;
  const isFirstRoundOfSuggestingSuit = actions.length < playersCount;

  if (!isFirstRoundOfSuggestingSuit) {
    return { error: 5 }; // swapping cards only allowed in first round
  }

  const hasRefusedToPlaySuitOfOpenedTrumpCard = actions.find(
    a =>
      a.type === PlayerActionTypeEnum.SUGGEST_SUIT &&
      a.suit === 'NONE' &&
      playersMap[a.playerIndex] === player,
  );

  if (hasRefusedToPlaySuitOfOpenedTrumpCard) {
    return { error: 6 }; // swapping cards is allowed only when player hasn't said 'pas' for this suit
  }

  const { openedTrumpCard } = game.table.deck;

  const isCardOfCorrectSuit = card.suit === openedTrumpCard?.suit;

  if (!isCardOfCorrectSuit) {
    return { error: 7 };
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
