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

export const convertGameRecord = (record: GameRecord, gameId?: string) => {
  const converted = record.map(r => ({
    id: r.id,
    name: r.name,
    fines: r.player.fines,
    bonuses: r.player.bonuses,
    points: r.points,
  }));

  if (gameId) {
    return {
      gameId,
      record: converted,
    };
  }

  return converted;
};
