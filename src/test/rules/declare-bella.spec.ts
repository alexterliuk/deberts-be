import { describe, expect, it } from 'vitest';
import { DebertsGame } from '../../client/game';
import canPlayerDeclareBella from '../../client/rules/declare-bella';

const game = new DebertsGame(['a', 'b']);

const player1 = game.playersRecs[0].player;
const player2 = game.playersRecs[1].player;

describe(`canPlayerDeclareBella`, () => {
  it(`[ERR] when player declares Bella but doesn't have such combination`, () => {
    game.hasBella = player1;
    expect(canPlayerDeclareBella(player2, game)).toEqual({ error: 17 });
  });
});
