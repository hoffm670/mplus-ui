import { DEFAULT_TITLE, REGIONS, TITLES, Title } from "./constants";

export interface AppPath {
  title: Title;
  region: string;
  realm?: string;
  character?: string;
}

export const parseAppPath = (pathname: string): AppPath | null => {
  const [title, region, realm, character] = pathname.split("/").filter(Boolean);

  if (!TITLES.includes(title as Title) || !REGIONS.includes(region)) {
    return null;
  }

  return { title: title as Title, region, realm, character };
};

export const getDefaultAppPath = (): AppPath => ({
  title: DEFAULT_TITLE,
  region: "us",
});

export const buildAppPath = ({ title, region, realm, character }: AppPath): string => {
  if (realm && character) {
    return `/${title}/${region}/${realm}/${character}`;
  }
  return `/${title}/${region}`;
};
