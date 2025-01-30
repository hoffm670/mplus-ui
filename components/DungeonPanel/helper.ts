export const getDungeonLink = (dungeonSlug: string, season: string, region: string) => {
  return `https://raider.io/mythic-plus-rankings/${season}/${dungeonSlug}/${region}/leaderboards-strict`;
};

export const getDungeonRun = (run: {}): DungeonRun => {
  return { level: run["mythic_level"], time_ms: run["clear_time_ms"] } as DungeonRun;
};
