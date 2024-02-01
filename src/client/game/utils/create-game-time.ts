export type GameTime = {
  startedAt: string;
  finishedAt: string;
  pausedAt: string;
};

export const createGameTime = (): GameTime => {
  const time = new Date().toISOString();

  return {
    startedAt: time,
    finishedAt: '', // empty means not finished
    pausedAt: time, // empty when finished
  };
};
