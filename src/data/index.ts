import { SuitCardsData } from '@alexterliuk/cards-on-table';

const suitCardsData: SuitCardsData = [
  // name, value, rank
  ['ace', 11, 8],
  ['ten', 10, 7],
  ['king', 4, 6],
  ['queen', 3, 5],
  ['jack', 2, 4],
  ['nine', 0, 3],
  ['eight', 0, 2],
  ['seven', 0, 1],
];

const trumpSuitCardsData: SuitCardsData = [
  // name, value, rank
  ['jack', 20, 8],
  ['nine', 14, 7],
  ['ace', 11, 6],
  ['ten', 10, 5],
  ['king', 4, 4],
  ['queen', 3, 3],
  ['eight', 0, 2],
  ['seven', 0, 1],
];

const spadesSuitData = { name: 'spades', cardsData: suitCardsData };
const heartsSuitData = { name: 'hearts', cardsData: suitCardsData };
const diamondsSuitData = { name: 'diamonds', cardsData: suitCardsData };
const clubsSuitData = { name: 'clubs', cardsData: suitCardsData };

export const debertsData = {
  suitsData: [spadesSuitData, heartsSuitData, diamondsSuitData, clubsSuitData],
  trumpSuitCardsData,
};

export const playerQty = 4;
