export interface KeyData {
  keyLevel: string;
  count: number;
  percentage: number;
}

export const SEGMENT_RANGE_SEPARATOR = " - ";

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
    keyLevel: `${keys[0].keyLevel ?? 0}${SEGMENT_RANGE_SEPARATOR}${keys[keys.length - 1].keyLevel}`,
    count: sumCount,
    percentage: sumPercent,
  };
};

const parseSegmentLevels = (keyLevel: string): { min: number; max: number } => {
  if (keyLevel.includes(SEGMENT_RANGE_SEPARATOR)) {
    const [minStr, maxStr] = keyLevel.split(SEGMENT_RANGE_SEPARATOR);
    return { min: Number(minStr), max: Number(maxStr) };
  }
  const level = Number(keyLevel);
  return { min: level, max: level };
};

const getWithinLevelPercent = (characterRun: DungeonRun, levelRuns: DungeonRun[]): number => {
  if (levelRuns.length === 0) {
    // No timing data at this level; place marker at the middle of the level slice.
    return 50;
  }
  const beats = levelRuns.filter((run) => characterRun.time_ms < run.time_ms).length;
  return (beats / levelRuns.length) * 100;
};

const getWithinSegmentPercent = (
  characterRun: DungeonRun,
  segment: KeyData,
  keyCounts: { [key: string]: number },
  dungeonRuns: DungeonRun[]
): number => {
  const levels = parseSegmentLevels(segment.keyLevel);
  let weightedKeyOffset = 0;

  for (let level = levels.min; level < characterRun.level; level++) {
    weightedKeyOffset += keyCounts[String(level)] ?? 0;
  }

  const levelCount = keyCounts[String(characterRun.level)] ?? 0;
  const levelRuns = dungeonRuns.filter((run) => run.level === characterRun.level);
  const withinLevelPercent = getWithinLevelPercent(characterRun, levelRuns);
  weightedKeyOffset += (withinLevelPercent / 100) * levelCount;

  return segment.count > 0 ? (weightedKeyOffset / segment.count) * 100 : 0;
};

// Positions the character marker on the stacked bar. Segment widths come from
// keyData (derived from keyCounts); within a key level, position is interpolated
// from dungeonRuns time rankings at that level.
export const getKeyPositionPercent = (
  keyData: KeyData[],
  keyCounts: { [key: string]: number },
  dungeonRuns: DungeonRun[],
  characterRun: DungeonRun
): number => {
  if (keyData.length === 0) {
    return 0;
  }

  const segmentLevels = keyData.map((segment) => parseSegmentLevels(segment.keyLevel));
  const globalMin = Math.min(...segmentLevels.map((levels) => levels.min));
  const globalMax = Math.max(...segmentLevels.map((levels) => levels.max));

  if (characterRun.level < globalMin) {
    return 0;
  }
  if (characterRun.level > globalMax) {
    return 100;
  }

  let cumulativePercent = 0;

  for (const segment of keyData) {
    const levels = parseSegmentLevels(segment.keyLevel);

    if (characterRun.level >= levels.min && characterRun.level <= levels.max) {
      const withinSegmentPercent = getWithinSegmentPercent(characterRun, segment, keyCounts, dungeonRuns);
      return cumulativePercent + (withinSegmentPercent / 100) * segment.percentage;
    }

    cumulativePercent += segment.percentage;
  }

  return 100;
};
