import { FC, useEffect } from "react";
import { modifyData, KeyData } from "./helper";
import { initFlowbite } from "flowbite";

interface StackedGraphProps {
  keyCounts: {};
}

const newColors = [
  "bg-gray-400 hover:bg-gray-500",
  "bg-green-400 hover:bg-green-500",
  "bg-blue-400 hover:bg-blue-500",
  "bg-purple-400 hover:bg-purple-500",
  "bg-orange-400 hover:bg-orange-500",
  "bg-red-400 hover:bg-red-500",
  "bg-cyan-400 hover:bg-cyan-500",
  "bg-yellow-300 hover:bg-yellow-400",
  "bg-black hover:bg-gray-800",
];

const StackedGraph: FC<StackedGraphProps> = ({ keyCounts }) => {
  const keyData: KeyData[] = modifyData(keyCounts);
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div>
      <div className="flex text-center bg-gray-800">
        {keyData.map((data, index) => {
          let tag = Math.random().toString(36);
          return (
            <div
              data-tooltip-target={tag}
              key={data.keyLevel}
              className={`mr-px ${newColors[index]} cursor-pointer`}
              style={{
                width: `${data.percentage}%`,
              }}
            >
              <div>
                {data.percentage > 4 && !data.keyLevel.includes("-")
                  ? data.keyLevel
                  : ""}
              </div>
              <div
                id={tag}
                role="tooltip"
                className="absolute z-10 invisible px-3 py-2 text-xs font-medium text-black transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-0 tooltip flex flex-col"
              >
                <span>{`Key Level: ${data.keyLevel}`}</span>
                <span>{`Characters: ${data.count}`}</span>
                <span>{`Percentage: ${data.percentage.toFixed(1)}%`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedGraph;
