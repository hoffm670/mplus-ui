import { FC } from "react";
import { DungeonIcon } from "../dungeons";
import { Fortified, Tyrannical } from "../Images";
import StackedGraph from "../StackedGraph";

interface DungeonPanelProps {
  shortName: string;
  dungeonStats: {};
}

export const DungeonPanel: FC<DungeonPanelProps> = ({
  shortName,
  dungeonStats,
}) => {
  return (
    <div className="flex flex-col w-full bg-gray-900 bg-gradient-to-tr rounded-lg p-2 border-gray-700 border-2 shadow-2xl">
      {/* Title Row */}
      <div className="flex flex-row pb-2">
        <DungeonIcon
          className="rounded-lg"
          dungeonShort={shortName}
          size={35}
        />
        <div className="flex items-center">
          <span className="ml-2">Darkheart Thicket</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex items-center">
            <Fortified width={30} height={30} />
          </div>
          <div className="grow p-2">
            <StackedGraph keyCounts={dungeonStats["Fortified"]} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex items-center">
            <Tyrannical width={30} height={30} />
          </div>
          <div className="grow p-2">
            <StackedGraph keyCounts={dungeonStats["Tyrannical"]} />
          </div>
        </div>
      </div>
    </div>
  );
};
