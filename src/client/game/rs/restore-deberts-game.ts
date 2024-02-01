import { getPlayer } from '../../utils';
import { DebertsGame } from '..';
import { DebertsGameDB } from '../types';
import { getCardFromDeck, mapDeckAllCards } from '../utils';
import { restoreTable } from '.';

export const restoreDebertsGame = (gameDB: DebertsGameDB) => {
  const playersIds = gameDB.playersRecs.map(rec => rec.id);

  const game = new DebertsGame(playersIds);
  const deckAllCardsMap = mapDeckAllCards(game.table.deck);

  game.meta = gameDB.meta;

  game.playersRecs.forEach((rec, index) => {
    const recSR = gameDB.playersRecs[index];
    rec.name = recSR.name;
    rec.points = recSR.points;

    if (recSR.player.bonuses.length > 0) {
      rec.player.bonuses = recSR.player.bonuses;
    }

    if (recSR.player.combinations.length > 0) {
      rec.player.combinations = recSR.player.combinations.map(combSR =>
        combSR.map(cardSR => getCardFromDeck(cardSR, deckAllCardsMap)),
      );
    }

    if (recSR.player.fines.length > 0) {
      rec.player.fines = recSR.player.fines;
    }

    if (recSR.player.ownCards.length > 0) {
      rec.player.ownCards = recSR.player.ownCards.map(cardSR =>
        getCardFromDeck(cardSR, deckAllCardsMap),
      );
    }
  });

  restoreTable(gameDB, game, deckAllCardsMap);

  game.actions = gameDB.actions;

  game.cardsInDeck = gameDB.cardsInDeck.map(cardSR =>
    getCardFromDeck(cardSR, deckAllCardsMap),
  );

  game.currentRound = gameDB.currentRound;
  game.currentRoundActions = gameDB.currentRoundActions;
  game.currentDealer = gameDB.currentDealer;

  game.nextMove = getPlayer(game, { id: gameDB.nextMovePlayerId });
  game.lastWon = getPlayer(game, { id: gameDB.lastWonPlayerId });
  game.willTake = getPlayer(game, { id: gameDB.willTakePlayerId });
  game.obligatedToWin = getPlayer(game, { id: gameDB.obligatedToWinPlayerId });
  game.hasBella =
    gameDB.hasBellaPlayerId === null
      ? null
      : getPlayer(game, { id: gameDB.hasBellaPlayerId });

  return game;
};
