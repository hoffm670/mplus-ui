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
  runs: { [key: string]: number };
}

interface DungeonInfo {
  slug: string;
  shortname: string;
  id: string;
  name: string;
}

interface CharacterInfo {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  thumbnail_url: string;
  realm: string;
  profile_url: string;
  mythic_plus_ranks: {};
  mythic_plus_best_runs: [];
  mythic_plus_scores_by_season: {};
  guild: {};
}
