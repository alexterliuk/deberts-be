import { ObjectId } from '..';

export const getObjectId = (maybeHex?: string) => {
  try {
    return new ObjectId(maybeHex);
  } catch (e) {
    return null;
  }
};
