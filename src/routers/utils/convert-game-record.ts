import { PlayerSR } from '../../client/game/types';

export type GameRecord = {
  id: string;
  name: string;
  player: {
    fines: PlayerSR['fines'];
    bonuses: PlayerSR['bonuses'];
  };
  points: number;
}[];

export type ConvertedGameRecord = {
  gameId: string;
  record: {
    id: string;
    name: string;
    fines: PlayerSR['fines'];
    bonuses: PlayerSR['bonuses'];
    points: number;
  }[];
};

export const convertGameRecord = (
  record: GameRecord,
  gameId: string,
): ConvertedGameRecord => {
  const converted = record.map(r => ({
    id: r.id,
    name: r.name,
    fines: r.player.fines,
    bonuses: r.player.bonuses,
    points: r.points,
  }));

  return {
    gameId,
    record: converted,
  };
};
