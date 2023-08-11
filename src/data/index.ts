import { DeckCardsData, SuitCardsData } from '@alexterliuk/cards-on-table';

const SUIT_CARDS_DATA: SuitCardsData = [
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

const TRUMP_SUIT_CARDS_DATA: SuitCardsData = [
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

const SPADES_SUIT_DATA = { name: 'spades', cardsData: SUIT_CARDS_DATA };
const HEARTS_SUIT_DATA = { name: 'hearts', cardsData: SUIT_CARDS_DATA };
const DIAMONDS_SUIT_DATA = { name: 'diamonds', cardsData: SUIT_CARDS_DATA };
const CLUBS_SUIT_DATA = { name: 'clubs', cardsData: SUIT_CARDS_DATA };

export const DEBERTS_DATA: DeckCardsData = {
  suitsData: [
    SPADES_SUIT_DATA,
    HEARTS_SUIT_DATA,
    DIAMONDS_SUIT_DATA,
    CLUBS_SUIT_DATA,
  ],
  trumpSuitCardsData: TRUMP_SUIT_CARDS_DATA,
};

export const BELLA_CARD_NAMES = ['queen', 'king'];

// temporary constant, it'll come from the client at game start
export const PLAYERS_QTY = 4;

export const MIN_PLAYERS_QTY = 2;
export const MAX_PLAYERS_QTY = 4;
