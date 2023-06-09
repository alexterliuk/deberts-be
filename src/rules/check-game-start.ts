import { MIN_PLAYERS_QTY, MAX_PLAYERS_QTY } from '../data';

function isValidPlayersQty(players: (number | string)[]) {
  const isValidQty =
    players.length >= MIN_PLAYERS_QTY && players.length <= MAX_PLAYERS_QTY;

  return isValidQty ? true : { error: 1 };
}

export { isValidPlayersQty };
