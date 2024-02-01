import { getObjectId } from '../../../db/utils/get-object-id';

export const createInitiatedBy = (maybeId: string) =>
  getObjectId(maybeId)?.toString() ?? 'Player 1';
