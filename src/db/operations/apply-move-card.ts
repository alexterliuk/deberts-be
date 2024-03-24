import mongodb from 'mongodb';
import { client } from '..';
import { MoveCardActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getCardIndexInOwnCards } from '../../client/game/utils/get-card-index-in-own-cards';
import { getPlayerId } from '../../client/game/utils';
import { serializeCard } from '../../client/game/sr';

export const applyMoveCard = async (
  game: DebertsGame,
  gameId: mongodb.BSON.ObjectId,
  action: MoveCardActionType,
) => {
  try {
    const { playerIndex, card: cardFace } = action;

    const db = client.db();

    const player = game.playersRecs[playerIndex].player;
    const cardIndex = getCardIndexInOwnCards(game, playerIndex, cardFace);
    const card = player.ownCards[cardIndex];
    const cardSR = serializeCard(card);

    await db.collection('games').updateOne(
      { _id: gameId },
      {
        $push: {
          actions: action,
          currentRoundActions: action,
          'table.beatArea': {
            playerId: getPlayerId(player, game.playersRecs),
            cards: [cardSR],
          },
        },
        $pull: {
          [`playersRecs.${playerIndex}.player.ownCards`]: {
            name: card.name,
            suit: card.suit,
          },
        },
      },
    );

    game.actions.push(action);
    game.currentRoundActions.push(action);
    player.ownCards.splice(cardIndex, 1);

    game.table.beatArea.push({ player, cards: [card] });

    return { success: true };
  } catch (e) {
    console.log(`ERROR -3 [applyAction]: ${e}`);
    return { error: -3 };
  }
};
