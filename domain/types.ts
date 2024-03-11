interface DungeonStatsResponse {
  dungeons: DungeonStats[];
  date: string;
  region: string;
  time: string;
  timestamp: number;
  season: string;
  change_days: number;
  change: number;
  rating_cutoff: number;
  character_count: number;
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
