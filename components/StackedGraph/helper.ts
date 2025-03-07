export interface KeyData {
  keyLevel: string;
  count: number;
  percentage: number;
}

const THRESHOLD = 4;

export const modifyData = (keyCounts: { [key: string]: number }): KeyData[] => {
  const keys = Object.keys(keyCounts);
  keys.sort((a, b) => Number(a) - Number(b));
  const sum = keys.reduce((accumulator: number, key: string) => accumulator + keyCounts[key], 0);
  let out = keys.map((key) => {
    return {
      keyLevel: key,
      count: keyCounts[key],
      percentage: (keyCounts[key] / sum) * 100,
    };
  });
  return groupSmall(out);
};

const groupSmall = (keyData: KeyData[]) => {
  const outKeys = [];
  let combined = false;
  let toCombine: KeyData[] = [];
  for (let i = 0; i < keyData.length; i++) {
    const current = keyData[i];
    if (current.percentage < THRESHOLD && !combined) {
      toCombine.push(current);
    } else {
      if (toCombine.length > 0) {
        outKeys.push(combineKeyData(toCombine));
        toCombine = [];
        combined = true;
      }
      outKeys.push(current);
    }
  }
  if (toCombine.length > 0) {
    outKeys.push(combineKeyData(toCombine));
  }
  return outKeys;
};

const combineKeyData = (keys: KeyData[]): KeyData => {
  if (keys.length == 1) {
    return keys[0];
  }

  const sumPercent = keys.reduce((accumulator: number, key: KeyData) => accumulator + key.percentage, 0);
  const sumCount = keys.reduce((accumulator: number, key: KeyData) => accumulator + key.count, 0);
  return {
    keyLevel: `${keys[0].keyLevel ?? 0} - ${keys[keys.length - 1].keyLevel}`,
    count: sumCount,
    percentage: sumPercent,
  };
};

export const getKeyPositionPercent = (dungeonRuns: DungeonRun[], characterRun: DungeonRun) => {
  dungeonRuns.sort((a, b) => {
    if (a.level === b.level) {
      return b.time_ms - a.time_ms;
    } else {
      return a.level - b.level;
    }
  });
  return findRunIndex(dungeonRuns, characterRun);
};

const findRunIndex = (sortedRuns: DungeonRun[], characterRun: DungeonRun): number => {
  let index: number = 0;
  while (index < sortedRuns.length) {
    let run = sortedRuns[index];
    if (characterRun.level > run.level || (characterRun.level === run.level && characterRun.time_ms < run.time_ms)) {
      index++;
    } else {
      return Math.round(100 * (index / sortedRuns.length));
    }
  }
};
