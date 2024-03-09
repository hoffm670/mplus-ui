import Header from "@/components/Header";
import { BlackRookHold, Fortified, Tyrannical } from "@/components/Images";
import StackedGraph from "@/components/StackedGraph";
import { sample } from "@/sample";

const keyCounts = {
  "23": 2,
  "24": 1,
  "25": 2,
  "26": 19,
  "27": 304,
  "28": 765,
  "29": 191,
  "30": 40,
  "20": 1,
};

export default function Home() {
  const dungeons: { [key: string]: {} } = sample["dungeons"];
  const keys = Object.keys(dungeons);
  return (
    <div className="flex flex-col items-center">
      <Header title="Mythic Plus Title Keys Breakdown" />
      <div className="w-full max-w-6xl">
        {keys.map((key) => {
          return (
            <div className="flex w-full my-2.5">
              <div>
                <BlackRookHold width={65} height={65} />
              </div>
              <div className="flex flex-col grow">
                <div className="flex flex-row">
                  <div>
                    <Fortified width={30} height={30} />
                  </div>
                  <div className="grow p-2">
                    <StackedGraph keyCounts={dungeons[key]["Fortified"]} />
                  </div>
                </div>
                <div className="flex flex-row">
                  <div>
                    <Tyrannical width={30} height={30} />
                  </div>
                  <div className="grow p-2">
                    <StackedGraph keyCounts={dungeons[key]["Tyrannical"]} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
