export const getDungeonLink = (dungeonSlug: string, season: string, region: string) => {
  return `https://raider.io/mythic-plus-rankings/${season}/${dungeonSlug}/${region}/leaderboards-strict`;
};

export const parseRunList = (runList: string[]): DungeonRun[] =>
  runList.map((entry) => {
    const [level, timeSeconds] = entry.split("-");
    return {
      level: Number(level),
      time_ms: Number(timeSeconds) * 1000,
    };
  });

export const getDungeonRun = (run: {}): DungeonRun => {
  return { level: run["mythic_level"], time_ms: run["clear_time_ms"] } as DungeonRun;
};
