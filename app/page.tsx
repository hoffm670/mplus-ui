"use client";
import { DungeonPanel } from "@/components/DungeonPanel";
import Header from "@/components/Header";
import useGetStats from "@/domain/queries/get-stats";

export default function Home() {
  const { data, isLoading, error, isValidating } = useGetStats();

  return (
    <div className="flex flex-col items-center min-w-[800px]">
      <Header title="Mythic Plus Title Keys Breakdown" />
      <div className="w-full max-w-6xl">
        {data?.dungeons.map((dungeon) => {
          return (
            <div key={dungeon.info.slug} className="my-2.5">
              <DungeonPanel dungeonStats={dungeon} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
