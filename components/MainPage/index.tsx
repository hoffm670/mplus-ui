import { DungeonPanel } from "@/components/DungeonPanel";
import { StatPanel } from "@/components/StatPanel";
import useGetStats from "@/domain/queries/get-stats";
import { Spinner } from "flowbite-react";
import { FC } from "react";

interface MainPageProps {
  region: string;
}

export const MainPage: FC<MainPageProps> = ({ region }) => {
  const { data, isLoading, error, isValidating } = useGetStats(region);

  return (
    <div className="w-full flex flex-col items-center">
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
                <StatPanel title="Eligible Characters" stat={data.character_count} />
              </div>
              <div className="w-2/6">
                <StatPanel title="Current Cutoff" stat={data.rating_cutoff} />
              </div>
              <div className="w-2/6">
                <StatPanel title={`${data.change_days} day cutoff change`} stat={data.change} />
              </div>
            </div>
            <div className="font-bold font-sans">Best Dungeons for Characters above cutoff</div>
            <div>
              {data?.dungeons.map((dungeon) => {
                return (
                  <div key={dungeon.info.slug} className="my-2.5">
                    <DungeonPanel dungeonStats={dungeon} region={region} season={data.season} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
