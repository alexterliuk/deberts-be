import { getPlayer } from '../../utils';
import { DebertsGame } from '..';
import { DebertsGameDB } from '../types';
import { getCardFromDeck, mapDeckAllCards } from '../utils';
import { restoreTable } from '.';

export const restoreDebertsGame = (gameDB: DebertsGameDB) => {
  const playersIds = gameDB.playersRecs.map(rec => rec.id);

  const game = new DebertsGame(playersIds);

  game.playersRecs.forEach((rec, index) => {
    rec.name = gameDB.playersRecs[index].name;
  });

  const deckAllCardsMap = mapDeckAllCards(game.table.deck);

  restoreTable(gameDB, game, deckAllCardsMap);

  game.actions = gameDB.actions;

  game.cardsInDeck = gameDB.cardsInDeck.map(cardSR =>
    getCardFromDeck(cardSR, deckAllCardsMap),
  );

  game.points = gameDB.points;
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
};
