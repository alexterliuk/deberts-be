import { describe, expect, it } from 'vitest';
import DebertsGame from '../../src/game';
import { Player, Deck } from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA } from '../../src/data';
import {
  canPlayerTradeCombination,
  rankCombinations,
  isDebertsCombination,
} from '../../src/rules/trade-combinations';
import { PlayerActionTypeEnum } from '../../src/actions/types';

const gameDeck = new Deck(DEBERTS_DATA);
const deckAllCardsQty = gameDeck.allCards.length;
const player1 = new Player(gameDeck);
const player2 = new Player(gameDeck);
const player3 = new Player(gameDeck);
const player4 = new Player(gameDeck);

const game = new DebertsGame([player1, player2, player3, player4]);
const deck = game.table.deck;
const table = game.table;

/* eslint-disable @typescript-eslint/no-unused-vars */

const aceSpades = deck.allCards[0];
const tenSpades = deck.allCards[1];
const kingSpades = deck.allCards[2];
const queenSpades = deck.allCards[3];
const jackSpades = deck.allCards[4];
const nineSpades = deck.allCards[5];
const eightSpades = deck.allCards[6];
const sevenSpades = deck.allCards[7];

const aceHearts = deck.allCards[8];
const tenHearts = deck.allCards[9];
const kingHearts = deck.allCards[10];
const queenHearts = deck.allCards[11];
const jackHearts = deck.allCards[12];
const nineHearts = deck.allCards[13];
const eightHearts = deck.allCards[14];
const sevenHearts = deck.allCards[15];

const aceDiamonds = deck.allCards[16];
const tenDiamonds = deck.allCards[17];
const kingDiamonds = deck.allCards[18];
const queenDiamonds = deck.allCards[19];
const jackDiamonds = deck.allCards[20];
const nineDiamonds = deck.allCards[21];
const eightDiamonds = deck.allCards[22];
const sevenDiamonds = deck.allCards[23];

const aceClubs = deck.allCards[24];
const tenClubs = deck.allCards[25];
const kingClubs = deck.allCards[26];
const queenClubs = deck.allCards[27];
const jackClubs = deck.allCards[28];
const nineClubs = deck.allCards[29];
const eightClubs = deck.allCards[30];
const sevenClubs = deck.allCards[31];

/* eslint-enable @typescript-eslint/no-unused-vars */

const resetGame = () => {
  if (game.currentRound > 0) {
    game.currentRound = 0;
  }

  if (game.actions.length > 0) {
    game.actions = [];
  }

  if (deck.trumpSuitName) {
    deck.closeTrumpCardAndHide();
    deck.clearTrumpSuit();
  }

  if (player1.ownCards.length > 0) {
    player1.ownCards = [];
  }

  if (player2.ownCards.length > 0) {
    player2.ownCards = [];
  }

  if (player3.ownCards.length > 0) {
    player3.ownCards = [];
  }

  if (player4.ownCards.length > 0) {
    player4.ownCards = [];
  }

  if (deck.allCards.length !== deckAllCardsQty) {
    deck.returnAllCardsToDeck();
  }

  if (table.beatArea.length > 0) {
    table.beatArea = [];
  }

  if (game.currentRoundActions.length > 0) {
    game.currentRoundActions = [];
  }
};

describe(`canPlayerTradeCombination`, () => {
  it(`[ERR] when player tries to trade combination but has already made a move at current round`, () => {
    game.currentRoundActions.push({
      type: PlayerActionTypeEnum.MOVE_CARD,
      card: { name: 'ace', suit: 'clubs' },
      playerIndex: 0,
    });

    expect(
      canPlayerTradeCombination([{ player: player1, combination: [] }], game),
    ).toEqual({ error: 14 });

    resetGame();
  });
});

describe(`rankCombinations`, () => {
  it(`combination wins if this is a single one given`, () => {
    const ranked = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades, queenSpades],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
  });

  it(`combination with more senior card wins`, () => {
    const ranked = rankCombinations(
      [
        {
          player: player4,
          combination: [kingSpades, queenSpades, jackSpades],
        },
        {
          player: player1,
          combination: [aceClubs, kingClubs, queenClubs],
        },
        {
          player: player3,
          combination: [kingDiamonds, queenDiamonds, jackDiamonds],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
    expect(ranked[0].combination[0].suit).toEqual('clubs');
    expect(ranked[1].win).toEqual(false);
    expect(ranked[2].win).toEqual(false);
  });

  it(`all combinations win if senior card of each combination is the same`, () => {
    const ranked = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades, queenSpades],
        },
        {
          player: player2,
          combination: [aceClubs, kingClubs, queenClubs],
        },
        {
          player: player4,
          combination: [aceDiamonds, kingDiamonds, queenDiamonds],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
    expect(ranked[1].win).toEqual(true);
    expect(ranked[2].win).toEqual(true);
  });

  it(`combination with trump suit wins if senior card of each combination is the same`, () => {
    deck.trumpSuitName = 'clubs';

    const ranked = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades, queenSpades],
        },
        {
          player: player2,
          combination: [aceClubs, kingClubs, queenClubs],
        },
        {
          player: player3,
          combination: [aceHearts, kingHearts, queenHearts],
        },
        {
          player: player4,
          combination: [aceDiamonds, kingDiamonds, queenDiamonds],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
    expect(ranked[0].combination[0].suit).toEqual('clubs');
    expect(ranked[1].win).toEqual(false);
    expect(ranked[2].win).toEqual(false);
    expect(ranked[3].win).toEqual(false);
  });

  it(`combination with more cards wins if senior card of each combination is the same`, () => {
    deck.trumpSuitName = 'clubs';

    const ranked = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades, queenSpades],
        },
        {
          player: player2,
          combination: [aceClubs, kingClubs, queenClubs],
        },
        {
          player: player3,
          combination: [aceHearts, kingHearts, queenHearts, jackHearts],
        },
        {
          player: player4,
          combination: [aceDiamonds, kingDiamonds, queenDiamonds],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
    expect(ranked[0].combination[0].suit).toEqual('hearts');
    expect(ranked[1].win).toEqual(false);
    expect(ranked[2].win).toEqual(false);
    expect(ranked[3].win).toEqual(false);
  });

  it(`combination with more cards wins if another combination has more senior card`, () => {
    deck.trumpSuitName = 'diamonds';

    const ranked = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades, queenSpades],
        },
        {
          player: player2,
          combination: [tenClubs, nineClubs, eightClubs, sevenClubs],
        },
        {
          player: player3,
          combination: [kingHearts, queenHearts, jackHearts],
        },
        {
          player: player4,
          combination: [kingDiamonds, queenDiamonds, jackDiamonds],
        },
      ],
      game,
    );

    expect(ranked[0].win).toEqual(true);
    expect(ranked[0].combination[0].suit).toEqual('clubs');
    expect(ranked[1].win).toEqual(false);
    expect(ranked[2].win).toEqual(false);
    expect(ranked[3].win).toEqual(false);
  });
});

describe(`isValidCombination (via rankCombinations)`, () => {
  it(`[ERR] when player gives invalid combination`, () => {
    const ranked1 = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, tenSpades, kingSpades], // not adjacent cards
        },
      ],
      game,
    );
    expect(ranked1[0].error).toEqual(15);
    expect(ranked1[0].win).toEqual(false);

    const ranked2 = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingSpades], // not enough cards (min qty is 3)
        },
      ],
      game,
    );
    expect(ranked2[0].error).toEqual(15);
    expect(ranked2[0].win).toEqual(false);

    const ranked3 = rankCombinations(
      [
        {
          player: player1,
          combination: [
            aceSpades,
            kingSpades,
            queenSpades,
            jackSpades,
            tenSpades,
            nineSpades,
            eightSpades,
            sevenSpades,
            sevenSpades,
          ], // too many cards (more than 8)
        },
      ],
      game,
    );
    expect(ranked3[0].error).toEqual(15);
    expect(ranked3[0].win).toEqual(false);

    const ranked4 = rankCombinations(
      [
        {
          player: player1,
          combination: [aceSpades, kingHearts, queenSpades], // not same suit
        },
      ],
      game,
    );
    expect(ranked4[0].error).toEqual(15);
    expect(ranked4[0].win).toEqual(false);

    resetGame();
  });
});

describe(`isDebertsCombination`, () => {
  it(`[true] when deberts combination given`, () => {
    // check if deberts when trading suits phase
    expect(
      isDebertsCombination(
        [aceSpades, tenSpades, kingSpades, queenSpades, jackSpades, nineSpades],
        game,
        player1,
      ),
    ).toEqual(true);

    // check if deberts when playing started
    game.currentRound = 1;

    expect(
      isDebertsCombination(
        [
          aceSpades,
          tenSpades,
          kingSpades,
          queenSpades,
          jackSpades,
          nineSpades,
          eightSpades,
          sevenSpades,
        ],
        game,
        player1,
      ),
    ).toEqual(true);

    resetGame();
  });

  it(`[false] when deberts combination given but player has already made a move`, () => {
    game.currentRound = 1;

    game.currentRoundActions.push({
      type: PlayerActionTypeEnum.MOVE_CARD,
      card: { name: 'jack', suit: 'diamonds' },
      playerIndex: 0,
    });

    expect(
      isDebertsCombination(
        [
          aceSpades,
          tenSpades,
          kingSpades,
          queenSpades,
          jackSpades,
          nineSpades,
          eightSpades,
          sevenSpades,
        ],
        game,
        player1,
      ),
    ).toEqual(false);

    resetGame();
  });
});
