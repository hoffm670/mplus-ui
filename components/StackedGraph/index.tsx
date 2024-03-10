import { FC } from "react";
import { modifyData, KeyData } from "./helper";

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
  "bg-yellow-400 hover:bg-yellow-500",
];

const StackedGraph: FC<StackedGraphProps> = ({ keyCounts }) => {
  const keyData: KeyData[] = modifyData(keyCounts);

  return (
    <div>
      <div className="flex text-center bg-gray">
        {keyData.map((data, index) => {
          return (
            <div
              key={data.keyLevel}
              className={`mr-px ${newColors[index]} cursor-pointer`}
              style={{
                width: `${data.percentage}%`,
              }}
            >
              {data.percentage > 4 && !data.keyLevel.includes("-")
                ? data.keyLevel
                : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedGraph;
