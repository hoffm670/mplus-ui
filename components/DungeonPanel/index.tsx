import { FC } from "react";
import { DungeonIcon } from "../DungeonIcon";
import { Panel } from "@/components/Panel";
import Image from "next/image";
import StackedGraph from "../StackedGraph";
import { useRouter } from "next/navigation";
import { SMALL_RAIDER_LOGO } from "@/domain/constants";
import { getDungeonLink } from "./helper";

interface DungeonPanelProps {
  dungeonStats: DungeonStats;
  season: string;
  region: string;
}

export const DungeonPanel: FC<DungeonPanelProps> = ({ dungeonStats, season, region }) => {
  const router = useRouter();
  return (
    <Panel>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between pb-2">
          <div className="flex flex-row justify-start">
            <DungeonIcon className="rounded-lg" dungeonShort={dungeonStats.info.shortname} size={35} />
            <div className="flex items-center">
              <span className="ml-2 font-bold uppercase">{dungeonStats.info.name}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center mx-1">
            <Image
              src={SMALL_RAIDER_LOGO}
              alt={"raider.io link"}
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => router.push(getDungeonLink(dungeonStats.info.slug, season, region))}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grow py-2 pl-2">
            <StackedGraph keyCounts={dungeonStats.runs} />
          </div>
        </div>
      </div>
    </Panel>
  );
};
