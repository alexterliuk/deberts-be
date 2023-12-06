import { DebertsGame } from '..';
import { getUsersNamesById } from '../../../db/queries';

export const addPlayersNames = async (game: DebertsGame) => {
  const playersIds = game.playersRecs.map(rec => rec.id);

  try {
    const usersNamesMap = await getUsersNamesById(playersIds);

    game.playersRecs.forEach((rec, index) => {
      rec.name = usersNamesMap[index];
    });

    return { errorMessage: '' };
  } catch (e) {
    return { errorMessage: 'Failed to add players names to deberts game.' };
  }
};
