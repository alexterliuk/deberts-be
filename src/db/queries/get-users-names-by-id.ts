import mongodb from 'mongodb';
import { client } from '..';
import { getObjectId } from '../utils/get-object-id';
import { User } from '../types';

export const getUsersNamesById = async (playersIds: string[]) => {
  // client.on('commandStarted', started => console.log(started));
  try {
    const db = client.db();
    const id1 = getObjectId(playersIds[0]);
    const id2 = getObjectId(playersIds[1]);
    const id3 = getObjectId(playersIds[2]);
    const id4 = getObjectId(playersIds[3]);

    const getId1 = async () =>
      id1 ? await db.collection<User>('users').findOne({ _id: id1 }) : null;
    const getId2 = async () =>
      id2 ? await db.collection<User>('users').findOne({ _id: id2 }) : null;
    const getId3 = async () =>
      id3 ? await db.collection<User>('users').findOne({ _id: id3 }) : null;
    const getId4 = async () =>
      id4 ? await db.collection<User>('users').findOne({ _id: id4 }) : null;

    const getIds = [getId1, getId2, getId3, getId4];

    let users: (mongodb.WithId<User> | null)[] = [];

    await Promise.all(getIds.slice(0, playersIds.length).map(f => f()))
      .then(v => {
        users = v;
      })
      .catch(e => {
        console.log(`ERROR 1 [getUsersNamesById]:\n${e}`);
      });

    let count = 0;

    return users.reduce(
      (acc: Record<number, string>, user: User | null, index) => {
        acc[index] = user?.name || `Anonymous ${++count}`;
        return acc;
      },
      {},
    );
  } catch (e) {
    console.log(`ERROR 2 [getUsersNamesById]:\n${e}`);
    return {};
  }
};
