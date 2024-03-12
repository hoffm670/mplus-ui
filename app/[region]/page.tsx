"use client";
import { DungeonPanel } from "@/components/DungeonPanel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatPanel } from "@/components/StatPanel";
import useGetStats from "@/domain/queries/get-stats";
import { usePathname } from "next/navigation";
import { GET_STATS_URL } from "@/domain/constants";
import { useEffect } from "react";
import { mutate } from "swr";
import { Spinner } from "flowbite-react";

export default function Main() {
  let pathname = usePathname();
  let region = pathname.replace(/^\//, "");

  useEffect(() => {
    mutate(GET_STATS_URL);
  }, [region]);
  const { data, isLoading, error, isValidating } = useGetStats(region);

  return (
    <div className="flex flex-col items-center min-w-[768px]">
      <Header title="Mythic Plus Title Tracker" region={region} />

      {isLoading ||
        (isValidating && (
          <div className="my-8">
            <Spinner aria-label="Loader" color="gray" className="w-20 h-20" />
          </div>
        ))}
      {!isLoading && !isValidating && data && (
        <>
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
          <Footer updatedTimestamp={data?.timestamp} />
        </>
      )}
    </div>
  );
}
