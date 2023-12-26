import { DebertsGame } from '../../client/game';
import {
  declareBella,
  move,
  suggestSuit,
  swapCards,
  tradeCombinations,
} from '../../client/actions';

const game = new DebertsGame(['a', 'b']);
const player1 = game.playersRecs[0].player;
const player2 = game.playersRecs[1].player;

const allCards = game.table.deck.allCards;
const card1 = allCards[0]; // ace spades
const card2 = allCards[1]; // ten spades
const card3 = allCards[2]; // king spades
card3.opened = true;
const card4 = allCards[3]; // queen spades
const card5 = allCards[4]; // jack spades
const card6 = allCards[5]; // nine spades
const card7 = allCards[6]; // eight spades
const card8 = allCards[7]; // seven spades
const card9 = allCards[8]; // ace hearts
const card10 = allCards[9]; // ten hearts
const card11 = allCards[10]; // king hearts
const card12 = allCards[11]; // queen hearts
const card13 = allCards[12]; // jack hearts
const card14 = allCards[13]; // nine hearts
const card15 = allCards[14]; // eight hearts
const card16 = allCards[15]; // seven hearts

// TABLE
game.table.beatArea = [{ player: player1, cards: [card3, card4] }];
game.table.discardPile = [card14, card15, card16];
game.table.playersBulks.forEach((bulk, index) => {
  if (index === 1) {
    bulk.player = player1;
    bulk.cards = [card10];
  }
});
game.table.playersCorners.forEach((corner, index) => {
  if (index === 1) {
    corner.cards = [card1, card2];
    corner.buyInCards = [card11, card12, card13];
    corner.takes = [[card4, card5, card6]];
  }
});
game.table.trumpCardCell = card7;
// TABLE.DECK
game.table.deck.openedTrumpCard = card8;
game.table.deck.shuffledLastTime = 12;
game.table.deck.trumpSuitName = 'diamonds';
game.table.deck.takenCards = [card7, card8, card9, card10, card11, card12];

game.playersRecs.forEach((rec, index) => {
  if (index === 0) {
    rec.name = 'Edgar';
    rec.player.bonuses = [{ name: 'Bella', value: 20 }];
    rec.player.combinations = [[card1, card2, card3]];
  }

  if (index === 1) {
    rec.name = 'Julia';
    rec.player.fines = [{ name: 'Byte', value: 0 }];
    rec.player.ownCards = [card1, card2, card3, card4, card5, card6];
  }
});

game.actions = [move, swapCards, suggestSuit, tradeCombinations, declareBella];
game.cardsInDeck = [card1, card2, card3];
game.points = [24, 50];
game.currentRound = 1;
game.currentRoundActions = [swapCards, suggestSuit];
game.currentDealer = 1;
game.nextMove = player2;
game.lastWon = player1;
game.willTake = player2;
game.obligatedToWin = player1;
game.hasBella = player1;

export { game, declareBella, move, suggestSuit, swapCards, tradeCombinations };
