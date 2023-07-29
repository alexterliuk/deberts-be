export const sort = <T, K extends keyof T>(
  direction: 'asc' | 'desc',
  data: T[] | T[][],
  key: K,
  index?: number,
) => {
  if (index !== undefined) {
    const tData = data as T[][];

    if (Array.isArray(tData[0])) {
      const sorted = tData.sort((a, b) => {
        const aOperand = a[index][key];
        const bOperand = b[index][key];

        if (typeof aOperand === 'number' && typeof bOperand === 'number') {
          return direction === 'desc'
            ? aOperand - bOperand
            : bOperand - aOperand;
        }

        return -1;
      });

      return sorted;
    }

    return tData;
  }

  const tData = data as T[];

  const sorted = tData.sort((a, b) => {
    const aOperand = a[key];
    const bOperand = b[key];

    if (typeof aOperand === 'number' && typeof bOperand === 'number') {
      return direction === 'desc' ? aOperand - bOperand : bOperand - aOperand;
    }

    return -1;
  });

  return sorted;
};
