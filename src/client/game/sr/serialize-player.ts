import { serializeCard, Player, PlayerSR } from '.';

/**
 * When restoring from db get:
 * - 'DECK' from DebertsGameDB.table.deck
 * - 'TABLE' from DebertsGameDB.table
 */
export const serializePlayer = (player: Player): PlayerSR => {
  const deck = 'DECK';
  const table = player.table ? 'TABLE' : player.table;

  const ownCards = player.ownCards.map(card => serializeCard(card));

  const combinations = player.combinations.map(combination =>
    combination.map(card => serializeCard(card)),
  );

  const fines = player.fines;
  const bonuses = player.bonuses;

  return {
    deck,
    table,
    ownCards,
    combinations,
    fines,
    bonuses,
  };
};
