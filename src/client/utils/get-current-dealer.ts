import { DebertsGame } from '../game';

export const getCurrentDealer = (game: DebertsGame) => {
  const { playersCount, currentRound, playersRecs } = game;

  if (currentRound === 0) {
    return playersRecs[0];
  }

  const index =
    currentRound % playersCount === 0
      ? playersCount - 1
      : (currentRound % playersCount) - 1;

  return playersRecs[index].player;
};

// let getCurrentDealer = (game) => {
//   const { playersCount, currentRound } = game;

//   if (currentRound === 0) {
//     return 0;
//   }

//   return currentRound % playersCount === 0
//     ? playersCount - 1
//     : (currentRound % playersCount) - 1;
// };

// getCurrentDealer({ playersCount: 4, currentRound: 0 });
// 0
// getCurrentDealer({ playersCount: 4, currentRound: 1 });
// 0
// getCurrentDealer({ playersCount: 4, currentRound: 2 });
// 1
// getCurrentDealer({ playersCount: 4, currentRound: 3 });
// 2
// getCurrentDealer({ playersCount: 4, currentRound: 4 });
// 3
// getCurrentDealer({ playersCount: 4, currentRound: 5 });
// 0
// getCurrentDealer({ playersCount: 4, currentRound: 6 });
// 1
// getCurrentDealer({ playersCount: 4, currentRound: 7 });
// 2
// getCurrentDealer({ playersCount: 4, currentRound: 8 });
// 3
// getCurrentDealer({ playersCount: 4, currentRound: 9 });
// 0
