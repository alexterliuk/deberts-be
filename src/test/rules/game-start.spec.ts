import { describe, expect, it } from 'vitest';
import { isValidPlayersQty } from '../../client/rules/game-start';

describe(`isValidPlayersQty`, () => {
  it(`returns true when given 2-4 players`, () => {
    const valid1 = isValidPlayersQty([1, 2]);
    const valid2 = isValidPlayersQty([1, 2, 3]);
    const valid3 = isValidPlayersQty([1, 2, 'a', 'b']);
    expect([valid1, valid2, valid3]).toEqual([true, true, true]);
  });

  it(`returns { error: 1 } when given 0-1, 5 or more players`, () => {
    const invalid1 = isValidPlayersQty([]);
    const invalid2 = isValidPlayersQty([1]);
    const invalid3 = isValidPlayersQty([1, 2, 3, 4, 5]);
    const invalid4 = isValidPlayersQty([1, 2, 'a', 'b', 'c', 6]);
    expect([invalid1, invalid2, invalid3, invalid4]).toEqual([
      { error: 1 },
      { error: 1 },
      { error: 1 },
      { error: 1 },
    ]);
  });
});
