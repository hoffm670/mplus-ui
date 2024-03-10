interface DungeonStatsResponse {
  dungeons: DungeonStats[];
  date: string;
  region: string;
  time: string;
  timestamp: number;
  season: string;
}

interface DungeonStats {
  info: DungeonInfo;
  Tyrannical: { [key: string]: number };
  Fortified: { [key: string]: number };
}

interface DungeonInfo {
  slug: string;
  shortname: string;
  id: string;
  name: string;
}
