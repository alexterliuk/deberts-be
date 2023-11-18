import { describe, expect, it } from 'vitest';
import { DebertsGame } from '../../client/game';
import { Player, Deck } from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA } from '../../client/data';
import canPlayerDeclareBella from '../../client/rules/declare-bella';

const deck = new Deck(DEBERTS_DATA);

const player1 = new Player(deck);
const player2 = new Player(deck);

const game = new DebertsGame([player1, player2]);

describe(`canPlayerDeclareBella`, () => {
  it(`[ERR] when player declares Bella but doesn't have such combination`, () => {
    game.hasBella = player1;
    expect(canPlayerDeclareBella(player2, game)).toEqual({ error: 17 });
  });
});
