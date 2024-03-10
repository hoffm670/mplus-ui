import { DungeonPanel } from "@/components/DungeonPanel";
import Header from "@/components/Header";
import { sample } from "@/sample";

export default function Home() {
  const dungeons: { [key: string]: {} } = sample["dungeons"];
  const keys = Object.keys(dungeons);
  return (
    <div className="flex flex-col items-center min-w-[800px]">
      <Header title="Mythic Plus Title Keys Breakdown" />
      <div className="w-full max-w-6xl">
        {keys.map((key) => {
          return (
            <div className="my-2.5">
              <DungeonPanel shortName={key} dungeonStats={dungeons[key]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
