import { FC } from "react";
import { Panel } from "../Panel";

interface StatPanelProps {
  title: string;
  stat: string | number;
}

export const StatPanel: FC<StatPanelProps> = ({ title, stat }) => {
  return (
    <div>
      <Panel>
        <div className="flex flex-row items-center">
          <div className="flex-1 text-center">
            <div className="font-bold uppercase text-gray-400">{title}</div>
            <div className="font-bold text-3xl">{stat}</div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
