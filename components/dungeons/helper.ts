export const getDungeonInfo = (shortName: string) => {
  return dungeonMap[shortName];
};

interface DungeonIconInfo {
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
};
