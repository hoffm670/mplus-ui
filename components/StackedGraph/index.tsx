import { FC } from "react";
import { modifyData, KeyData } from "./helper";

interface StackedGraphProps {
  keyCounts: {};
}

const colors = [
  { base: "bg-cyan-500", hover: "bg-cyan-200" },
  { base: "bg-green-500", hover: "bg-green-400" },
  { base: "bg-blue-500", hover: "bg-blue-400" },
  { base: "bg-purple-500", hover: "bg-purple-400" },
  { base: "bg-orange-500", hover: "bg-orange-400" },
  { base: "bg-yellow-500", hover: "bg-yellow-400" },
  { base: "bg-teal-500", hover: "bg-teal-400" },
];

const newColors = [
  "bg-gray-400 hover:bg-cyan-500",
  "bg-green-400 hover:bg-green-500",
  "bg-blue-400 hover:bg-blue-500",
  "bg-purple-400 hover:bg-purple-500",
  "bg-orange-400 hover:bg-orange-500",
  "bg-red-400 hover:bg-red-500",
  "bg-gray-400 hover:bg-cyan-500",
  "bg-gray-400 hover:bg-cyan-500",
  "bg-gray-400 hover:bg-cyan-500",
];

const StackedGraph: FC<StackedGraphProps> = ({ keyCounts }) => {
  const keyData: KeyData[] = modifyData(keyCounts);

  return (
    <div>
      <div
        className="flex text-center bg-gray"
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   width: "100%",
        //   background: "white",
        //   color: "black",
        // }}
      >
        {keyData.map((data, index) => {
          return (
            <div
              // className={`mr-px ${colors[index].base} hover:mr-10 hover:${colors[index].hover} cursor-pointer`}
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
      {/* <div>{JSON.stringify(keyCounts)}</div>
      <div>{JSON.stringify(keyData)}</div> */}
    </div>
  );
};

export default StackedGraph;
