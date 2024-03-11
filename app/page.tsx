"use client";
import { DungeonPanel } from "@/components/DungeonPanel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatPanel } from "@/components/StatPanel";
import useGetStats from "@/domain/queries/get-stats";

export default function Home() {
  const { data, isLoading, error, isValidating } = useGetStats();

  return (
    <div className="flex flex-col items-center min-w-[768px]">
      <Header title="Mythic Plus Title Keys Breakdown" />

      {data && (
        <div className="w-full max-w-6xl">
          <div className="flex flex-row w-full my-4 space-x-4">
            <div className="w-2/6">
              <StatPanel
                title="Eligible Characters"
                stat={data.character_count}
              />
            </div>
            <div className="w-2/6">
              <StatPanel title="Current Cutoff" stat={data.rating_cutoff} />
            </div>
            <div className="w-2/6">
              <StatPanel
                title={`${data.change_days} day cutoff change`}
                stat={data.change}
              />
            </div>
          </div>

          <div>
            {data?.dungeons.map((dungeon) => {
              return (
                <div key={dungeon.info.slug} className="my-2.5">
                  <DungeonPanel dungeonStats={dungeon} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footer updatedTimestamp={data?.timestamp} />
    </div>
  );
}
