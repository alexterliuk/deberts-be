import mongodb from 'mongodb';
import { client } from '..';
import { MoveCardActionType } from '../../client/data/types';
import { DebertsGame } from '../../client/game';
import { getCardIndexInOwnCards } from '../../client/game/utils/get-card-index-in-own-cards';
import { getPlayerId } from '../../client/game/utils';
import { serializeCard } from '../../client/game/sr';
import { getNextPlayer } from '../../client/utils/get-next-player';

export const applyMoveCard = async (
  game: DebertsGame,
  gameId: mongodb.BSON.ObjectId,
  action: MoveCardActionType,
) => {
  try {
    const { playerIndex, card: cardFace } = action;

    const player = game.playersRecs[playerIndex].player;
    const cardIndex = getCardIndexInOwnCards(game, playerIndex, cardFace);
    const card = player.ownCards[cardIndex];
    const cardSR = serializeCard(card);

    const { nextPlayer, nextPlayerId } = getNextPlayer(
      game,
      playerIndex,
      action,
    );

    const shouldUpdateNextMove = nextPlayer !== null;

    const db = client.db();

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
        ...(shouldUpdateNextMove
          ? { $set: { nextMovePlayerId: nextPlayerId } }
          : {}),
      },
    );

    game.actions.push(action);
    game.currentRoundActions.push(action);
    player.ownCards.splice(cardIndex, 1);

    game.table.beatArea.push({ player, cards: [card] });

    if (shouldUpdateNextMove) {
      game.nextMove = nextPlayer;
    }

    return { success: true };
  } catch (e) {
    console.log(`ERROR -3 [applyAction]: ${e}`);
    return { error: -3 };
  }
};
