export const getDungeonLink = (dungeonSlug: string, season: string, region: string) => {
  return `https://raider.io/mythic-plus-rankings/${season}/${dungeonSlug}/${region}/leaderboards-strict`;
};
