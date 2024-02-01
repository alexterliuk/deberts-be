import { describe, expect, it } from 'vitest';
import { serializeDebertsGame } from '../../client/game/sr';
import { restoreDebertsGame } from '../../client/game/rs';
import { Card } from '../../client/game/types';
import {
  declareBella,
  move,
  suggestSuit,
  swapCards,
  tradeCombinations,
} from './actions-mock';
import { game } from './mock';

const serializedGame = serializeDebertsGame(game);
const restoredGame = restoreDebertsGame(serializedGame);

const player1 = restoredGame.playersRecs[0].player;
const player2 = restoredGame.playersRecs[1].player;

const { allCards } = restoredGame.table.deck;

const card1 = allCards[0]; // ace spades
const card2 = allCards[1]; // ten spades
const card3 = allCards[2]; // king spades
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

const card17 = allCards[16]; // ace diamonds
const card18 = allCards[17]; // ten diamonds
const card19 = allCards[18]; // king diamonds
const card20 = allCards[19]; // queen diamonds
const card21 = allCards[20]; // jack diamonds
const card22 = allCards[21]; // nine diamonds
const card23 = allCards[22]; // eight diamonds
const card24 = allCards[23]; // seven diamonds

const card25 = allCards[24]; // ace clubs
const card26 = allCards[25]; // ten clubs
const card27 = allCards[26]; // king clubs
const card28 = allCards[27]; // queen clubs
const card29 = allCards[28]; // jack clubs
const card30 = allCards[29]; // nine clubs
const card31 = allCards[30]; // eight clubs
const card32 = allCards[31]; // seven clubs

describe(`restoreDebertsGame`, () => {
  it(`restores meta`, () => {
    const { meta } = restoredGame;

    expect(meta.initiatedBy).toBe(serializedGame.meta.initiatedBy);
    expect(meta.time.startedAt).toBe(serializedGame.meta.time.startedAt);
    expect(meta.time.finishedAt).toBe(serializedGame.meta.time.finishedAt);
    expect(meta.time.pausedAt).toBe(serializedGame.meta.time.pausedAt);
  });

  it(`restores cards`, () => {
    expect([
      card1.suit,
      card2.suit,
      card3.suit,
      card4.suit,
      card5.suit,
      card6.suit,
      card7.suit,
      card8.suit,
      card9.suit,
      card10.suit,
      card11.suit,
      card12.suit,
      card13.suit,
      card14.suit,
      card15.suit,
      card16.suit,
      card17.suit,
      card18.suit,
      card19.suit,
      card20.suit,
      card21.suit,
      card22.suit,
      card23.suit,
      card24.suit,
      card25.suit,
      card26.suit,
      card27.suit,
      card28.suit,
      card29.suit,
      card30.suit,
      card31.suit,
      card32.suit,
    ]).toEqual([
      'spades',
      'spades',
      'spades',
      'spades',
      'spades',
      'spades',
      'spades',
      'spades',
      'hearts',
      'hearts',
      'hearts',
      'hearts',
      'hearts',
      'hearts',
      'hearts',
      'hearts',
      'diamonds',
      'diamonds',
      'diamonds',
      'diamonds',
      'diamonds',
      'diamonds',
      'diamonds',
      'diamonds',
      'clubs',
      'clubs',
      'clubs',
      'clubs',
      'clubs',
      'clubs',
      'clubs',
      'clubs',
    ]);

    expect([
      card1.value,
      card2.value,
      card3.value,
      card4.value,
      card5.value,
      card6.value,
      card7.value,
      card8.value,
      card9.value,
      card10.value,
      card11.value,
      card12.value,
      card13.value,
      card14.value,
      card15.value,
      card16.value,
      card17.value,
      card18.value,
      card19.value,
      card20.value,
      card21.value,
      card22.value,
      card23.value,
      card24.value,
      card25.value,
      card26.value,
      card27.value,
      card28.value,
      card29.value,
      card30.value,
      card31.value,
      card32.value,
    ]).toEqual([
      11,
      10,
      4,
      3,
      2,
      0,
      0,
      0,
      11,
      10,
      4,
      3,
      2,
      0,
      0,
      0,
      11,
      10,
      4,
      3,
      2,
      0,
      0,
      0,
      11,
      10,
      4,
      3,
      2,
      0,
      0,
      0,
    ]);

    expect([
      card1.rank,
      card2.rank,
      card3.rank,
      card4.rank,
      card5.rank,
      card6.rank,
      card7.rank,
      card8.rank,
      card9.rank,
      card10.rank,
      card11.rank,
      card12.rank,
      card13.rank,
      card14.rank,
      card15.rank,
      card16.rank,
      card17.rank,
      card18.rank,
      card19.rank,
      card20.rank,
      card21.rank,
      card22.rank,
      card23.rank,
      card24.rank,
      card25.rank,
      card26.rank,
      card27.rank,
      card28.rank,
      card29.rank,
      card30.rank,
      card31.rank,
      card32.rank,
    ]).toEqual([
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
    ]);

    expect([
      card1.opened,
      card2.opened,
      card3.opened,
      card4.opened,
      card5.opened,
      card6.opened,
      card7.opened,
      card8.opened,
      card9.opened,
      card10.opened,
      card11.opened,
      card12.opened,
      card13.opened,
      card14.opened,
      card15.opened,
      card16.opened,
      card17.opened,
      card18.opened,
      card19.opened,
      card20.opened,
      card21.opened,
      card22.opened,
      card23.opened,
      card24.opened,
      card25.opened,
      card26.opened,
      card27.opened,
      card28.opened,
      card29.opened,
      card30.opened,
      card31.opened,
      card32.opened,
    ]).toEqual([
      false,
      false,
      true, // card3 is open in mock.ts
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);

    expect(card1.name).toBe('ace');
    expect(card2.name).toBe('ten');
    expect(card3.name).toBe('king');
    expect(card4.name).toBe('queen');
    expect(card5.name).toBe('jack');
    expect(card6.name).toBe('nine');
    expect(card7.name).toBe('eight');
    expect(card8.name).toBe('seven');

    expect(card9.name).toBe('ace');
    expect(card10.name).toBe('ten');
    expect(card11.name).toBe('king');
    expect(card12.name).toBe('queen');
    expect(card13.name).toBe('jack');
    expect(card14.name).toBe('nine');
    expect(card15.name).toBe('eight');
    expect(card16.name).toBe('seven');

    expect(card17.name).toBe('ace');
    expect(card18.name).toBe('ten');
    expect(card19.name).toBe('king');
    expect(card20.name).toBe('queen');
    expect(card21.name).toBe('jack');
    expect(card22.name).toBe('nine');
    expect(card23.name).toBe('eight');
    expect(card24.name).toBe('seven');

    expect(card25.name).toBe('ace');
    expect(card26.name).toBe('ten');
    expect(card27.name).toBe('king');
    expect(card28.name).toBe('queen');
    expect(card29.name).toBe('jack');
    expect(card30.name).toBe('nine');
    expect(card31.name).toBe('eight');
    expect(card32.name).toBe('seven');
  });

  it(`restores players`, () => {
    const { playersRecs } = restoredGame;

    expect(playersRecs.length).toBe(2);

    expect(playersRecs[0].id).toBe('a');
    expect(playersRecs[0].name).toBe('Edgar');
    expect(playersRecs[0].player).toBe(player1);
    expect(playersRecs[0].points).toBe(24);

    expect(player1.bonuses.length).toBe(1);
    expect(player1.bonuses[0]).toEqual({ name: 'Bella', value: 20 });
    expect(player1.combinations.length).toBe(1);
    expect(player1.combinations[0][0]).toBe(card1);
    expect(player1.combinations[0][1]).toBe(card2);
    expect(player1.combinations[0][2]).toBe(card3);

    expect(playersRecs[1].id).toBe('b');
    expect(playersRecs[1].name).toBe('Julia');
    expect(playersRecs[1].player).toBe(player2);
    expect(playersRecs[1].points).toBe(50);

    expect(player2.fines.length).toBe(1);
    expect(player2.fines[0]).toEqual({ name: 'Byte', value: 0 });
    expect(player2.ownCards.length).toBe(6);
    expect(player2.ownCards[0]).toBe(card1);
    expect(player2.ownCards[1]).toBe(card2);
    expect(player2.ownCards[2]).toBe(card3);
    expect(player2.ownCards[3]).toBe(card4);
    expect(player2.ownCards[4]).toBe(card5);
    expect(player2.ownCards[5]).toBe(card6);
  });

  it(`restores table.beatArea`, () => {
    const { beatArea } = restoredGame.table;

    expect(beatArea.length).toBe(1);
    expect(beatArea[0].player).toBe(player1);
    expect(beatArea[0].cards.length).toBe(2);

    expect(beatArea[0].cards[0]).toBe(card3);
    expect(beatArea[0].cards[0].name).toBe('king');
    expect(beatArea[0].cards[0].opened).toBe(true);
    expect(beatArea[0].cards[0].rank).toBe(6);
    expect(beatArea[0].cards[0].suit).toBe('spades');
    expect(beatArea[0].cards[0].value).toBe(4);

    expect(beatArea[0].cards[1]).toBe(card4);
    expect(beatArea[0].cards[1].name).toBe('queen');
    expect(beatArea[0].cards[1].opened).toBe(false);
    expect(beatArea[0].cards[1].rank).toBe(5);
    expect(beatArea[0].cards[1].suit).toBe('spades');
    expect(beatArea[0].cards[1].value).toBe(3);
  });

  it(`restores table.discardPile`, () => {
    const { discardPile } = restoredGame.table;

    expect(discardPile[0]).toBe(card14);
    expect(discardPile[0].name).toBe('nine');
    expect(discardPile[0].rank).toBe(3);
    expect(discardPile[0].suit).toBe('hearts');
    expect(discardPile[0].value).toBe(0);

    expect(discardPile[1]).toBe(card15);
    expect(discardPile[1].name).toBe('eight');
    expect(discardPile[1].rank).toBe(2);
    expect(discardPile[1].suit).toBe('hearts');
    expect(discardPile[1].value).toBe(0);

    expect(discardPile[2]).toBe(card16);
    expect(discardPile[2].name).toBe('seven');
    expect(discardPile[2].rank).toBe(1);
    expect(discardPile[2].suit).toBe('hearts');
    expect(discardPile[2].value).toBe(0);
  });

  it(`restores table.playersBulks`, () => {
    const { playersBulks } = restoredGame.table;

    expect(playersBulks.length).toBe(3);
    expect(playersBulks[0].player).toBe(null);

    expect(playersBulks[1].player).toBe(player1);
    expect(playersBulks[1].cards.length).toBe(1);
    expect(playersBulks[1].cards[0]).toBe(card10);
    expect((playersBulks[1].cards[0] as Card).name).toBe('ten');
    expect((playersBulks[1].cards[0] as Card).suit).toBe('hearts');

    expect(playersBulks[2].player).toBe(player2);
    expect(playersBulks[2].cards.length).toBe(0);
  });

  it(`restores table.playersCorners`, () => {
    const { playersCorners } = restoredGame.table;

    expect(playersCorners.length).toBe(2);

    expect(playersCorners[0].player).toBe(player1);
    expect(playersCorners[0].cards.length).toBe(0);
    expect(playersCorners[0].buyInCards.length).toBe(0);
    expect(playersCorners[0].takes.length).toBe(0);

    expect(playersCorners[1].player).toBe(player2);
    expect(playersCorners[1].cards.length).toBe(2);
    expect(playersCorners[1].cards[0]).toBe(card1);
    expect(playersCorners[1].cards[1]).toBe(card2);
    expect(playersCorners[1].buyInCards.length).toBe(3);
    expect(playersCorners[1].buyInCards[0]).toBe(card11);
    expect(playersCorners[1].buyInCards[1]).toBe(card12);
    expect(playersCorners[1].buyInCards[2]).toBe(card13);
    expect(playersCorners[1].takes.length).toBe(1);
    expect(playersCorners[1].takes[0].length).toBe(3);
    expect(playersCorners[1].takes[0][0]).toBe(card4);
    expect(playersCorners[1].takes[0][1]).toBe(card5);
    expect(playersCorners[1].takes[0][2]).toBe(card6);
  });

  it(`restores table.trumpCardCell`, () => {
    const { trumpCardCell } = restoredGame.table;

    expect(trumpCardCell).toBe(card7);
  });

  it(`restores table.deck.openedTrumpCard`, () => {
    const { openedTrumpCard } = restoredGame.table.deck;

    expect(openedTrumpCard).toBe(card8);
  });

  it(`restores table.deck.shuffledLastTime`, () => {
    const { shuffledLastTime } = restoredGame.table.deck;

    expect(shuffledLastTime).toBe(12);
  });

  it(`restores table.deck.trumpSuitName`, () => {
    const { trumpSuitName } = restoredGame.table.deck;

    expect(trumpSuitName).toBe('diamonds');
  });

  it(`restores table.deck.takenCards`, () => {
    const { takenCards } = restoredGame.table.deck;

    expect(takenCards.length).toBe(6);
    expect(takenCards[0]).toBe(card7);
    expect(takenCards[1]).toBe(card8);
    expect(takenCards[2]).toBe(card9);
    expect(takenCards[3]).toBe(card10);
    expect(takenCards[4]).toBe(card11);
    expect(takenCards[5]).toBe(card12);
  });

  it(`restores actions`, () => {
    const { actions } = restoredGame;

    expect(actions).toEqual([
      move,
      swapCards,
      suggestSuit,
      tradeCombinations,
      declareBella,
    ]);
  });

  it(`restores cardsInDeck`, () => {
    const { cardsInDeck } = restoredGame;

    expect(cardsInDeck.length).toBe(3);
    expect(cardsInDeck[0]).toBe(card1);
    expect(cardsInDeck[1]).toBe(card2);
    expect(cardsInDeck[2]).toBe(card3);
  });

  it(`restores currentRound`, () => {
    const { currentRound } = restoredGame;

    expect(currentRound).toBe(1);
  });

  it(`restores currentRoundActions`, () => {
    const { currentRoundActions } = restoredGame;

    expect(currentRoundActions).toEqual([swapCards, suggestSuit]);
  });

  it(`restores currentDealer`, () => {
    const { currentDealer } = restoredGame;

    expect(currentDealer).toBe(1);
  });

  it(`restores nextMove`, () => {
    const { nextMove } = restoredGame;

    expect(nextMove).toBe(player2);
  });

  it(`restores lastWon`, () => {
    const { lastWon } = restoredGame;

    expect(lastWon).toBe(player1);
  });

  it(`restores willTake`, () => {
    const { willTake } = restoredGame;

    expect(willTake).toBe(player2);
  });

  it(`restores obligatedToWin`, () => {
    const { obligatedToWin } = restoredGame;

    expect(obligatedToWin).toBe(player1);
  });

  it(`restores hasBella`, () => {
    const { hasBella } = restoredGame;

    expect(hasBella).toBe(player1);
  });
});
