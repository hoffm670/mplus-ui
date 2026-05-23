export const REGIONS = ["us", "eu", "tw", "kr"];

export const TITLES = ["hero", "champion"] as const;
export type Title = (typeof TITLES)[number];
export const DEFAULT_TITLE: Title = "hero";

export const TITLE_LABELS: Record<Title, string> = {
  hero: ".1%",
  champion: "1%",
};

export const TITLE_NAMES: Record<Title, string> = {
  hero: "Hero",
  champion: "Champion",
};

const TITLE_COLLECTION_SUFFIX: Record<Title, string> = {
  hero: "p999",
  champion: "p990",
};

export const getStatsCollection = (title: Title): string => {
  const base = process.env.DB_COLLECTION;
  return `${base}-${TITLE_COLLECTION_SUFFIX[title]}`;
};

export const RAIDER_IO = "https://raider.io";
export const BIG_RAIDER_LOGO = "https://cdn.raiderio.net/images/brand/Logo_2ColorWhite.png";
export const SMALL_RAIDER_LOGO = "https://cdn.raiderio.net/images/brand/Mark_2ColorWhite.svg";

export const SITE_TITLE = "Mythic Plus Title Tracker";

export const CHARACTER_AND_REALM: string = "Character & Realm";
export const RAIDER_LINK: string = "Raider.io Link";

export const BODY_EXTRA_MARGIN: string = "calc(100vh - 166px)";
