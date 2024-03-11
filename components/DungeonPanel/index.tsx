import { FC } from "react";
import { DungeonIcon } from "../DungeonIcon";
import { Panel } from "@/components/Panel";
import { Fortified, Tyrannical } from "../Images";
import StackedGraph from "../StackedGraph";

interface DungeonPanelProps {
  dungeonStats: DungeonStats;
}

export const DungeonPanel: FC<DungeonPanelProps> = ({ dungeonStats }) => {
  return (
    <Panel>
      {/* Title Row */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row pb-2">
          <DungeonIcon
            className="rounded-lg"
            dungeonShort={dungeonStats.info.shortname}
            size={35}
          />
          <div className="flex items-center">
            <span className="ml-2 font-bold uppercase">
              {dungeonStats.info.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex items-center">
              <Fortified width={30} height={30} />
            </div>
            <div className="grow p-2">
              <StackedGraph keyCounts={dungeonStats.Fortified} />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center">
              <Tyrannical width={30} height={30} />
            </div>
            <div className="grow p-2">
              <StackedGraph keyCounts={dungeonStats.Tyrannical} />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
