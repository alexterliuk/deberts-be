import {
  Card,
  Deck,
  Player,
  Table,
  SuitCardsData,
} from '@alexterliuk/cards-on-table';
import { PlayerActionType } from '../../actions/types';

export type CardSR = Pick<Card, 'name' | 'value' | 'suit' | 'rank' | 'opened'>;

export type DeckSR = {
  allCards: CardSR[];
  takenCards: CardSR[];
  openedTrumpCard: CardSR | null;
  suitNames: Deck['suitNames'];
  suits: Record<string, { name: string; cards: CardSR[] }>;
  shuffledLastTime: Deck['shuffledLastTime'];
  trumpSuitName: Deck['trumpSuitName'];
  trumpSuitCardsData: SuitCardsData;
  trumpCardsValues: Record<string, { value: number; rank: number }>;
};

export type PlayerSR = {
  deck: 'DECK';
  table: 'TABLE' | null;
  ownCards: CardSR[];
  combinations: CardSR[][];
  fines: { name: string; value: number }[];
  bonuses: { name: string; value: number }[];
};

export type TableSR = {
  deck: DeckSR;
  playersCorners: {
    playerId: string;
    cards: CardSR[];
    buyInCards: CardSR[];
    takes: CardSR[][];
  }[];
  playersBulks: {
    playerId: string | null;
    cards: (CardSR | CardSR[])[];
  }[];
  beatArea: { playerId: string; cards: CardSR[] }[];
  trumpCardCell: CardSR | null;
  discardPile: CardSR[];
};

export type DebertsGameDB = {
  table: TableSR;
  playersRecs: { id: string; name: string; player: PlayerSR }[];
  playersCount: number;
  actions: PlayerActionType[]; // for keeping history so that rew/fwd of steps is possible
  cardsInDeck: CardSR[];
  points: number[];
  currentRound: number; // 0 when trading suits, 1 etc. during actual game
  currentRoundActions: PlayerActionType[];
  currentDealer: number; // index of player in playersRecs
  nextMovePlayerId: string;
  lastWonPlayerId: string;
  willTakePlayerId: string;
  obligatedToWinPlayerId: string;
  hasBellaPlayerId: string | null;
};

export { Card, Deck, Player, Table };
