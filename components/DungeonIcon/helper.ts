export const getDungeonInfo = (shortName: string): DungeonIconInfo | undefined => {
  return dungeonMap[shortName] || undefined;
};

export interface DungeonIconInfo {
  url: string;
  alt: string;
}

const dungeonMap: Record<string, DungeonIconInfo> = {
  BRH: {
    url: "/brh.jpg",
    alt: "Black Rook Hold",
  },
  AD: {
    url: "/ad.jpg",
    alt: "Atal'Dazar",
  },
  WM: {
    url: "/waycrest.jpg",
    alt: "Waycrest Manor",
  },
  DHT: {
    url: "/dht.jpg",
    alt: "Darkheart Thicket",
  },
  FALL: {
    url: "/rise.jpg",
    alt: "Galakrond's Fall",
  },
  TOTT: {
    url: "/tott.jpg",
    alt: "Throne of the Tides",
  },
  EB: {
    url: "/eb.jpg",
    alt: "Everbloom",
  },
  RISE: {
    url: "/rise.jpg",
    alt: "Murozond's Rise",
  },
  ARAK: {
    url: "/arakara.jpg",
    alt: "Ara-Kara, City of Echoes",
  },
  COT: {
    url: "/cityofthreads.jpg",
    alt: "City of Threads",
  },
  GB: {
    url: "/grimbatol.jpg",
    alt: "Grim Batol",
  },
  SIEGE: {
    url: "/siegeofboralus.jpg",
    alt: "Siege of Boralus",
  },
  NW: {
    url: "/necroticwake.jpg",
    alt: "The Necrotic Wake",
  },
  MISTS: {
    url: "/mistsoftirnascythe.jpg",
    alt: "Mists of Tirna Scythe",
  },
  SV: {
    url: "/stonevault.jpg",
    alt: "The Stonevault",
  },
  DAWN: {
    url: "/dawnbreaker.jpg",
    alt: "The Dawnbreaker",
  },
  BREW: {
    url: "/cinderbrew-meadery.jpg",
    alt: "Cinderbrew Meadery",
  },
  DFC: {
    url: "/darkflame-cleft.jpg",
    alt: "Darkflame Cleft",
  },
  WORK: {
    url: "/mechagon-workshop.jpg",
    alt: "Mechagon Workshop",
  },
  FLOOD: {
    url: "/operation-floodgate.jpg",
    alt: "Operation Floodgate",
  },
  PSF: {
    url: "/priory-sacred-flame.jpg",
    alt: "Priory of the Sacred Flame",
  },
  ML: {
    url: "/motherlode.jpg",
    alt: "The MOTHERLODE!!",
  },
  ROOK: {
    url: "/rookery.jpg",
    alt: "The Rookery",
  },
  TOP: {
    url: "/theater-of-pain.jpg",
    alt: "Theater of Pain",
  },
};
