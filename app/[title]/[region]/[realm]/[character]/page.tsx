"use client";

import { DungeonPanel } from "@/components/DungeonPanel";
import { StatPanel } from "@/components/StatPanel";
import useGetCharacterInfo from "@/domain/queries/get-character-info";
import useGetStats from "@/domain/queries/get-stats";
import { DEFAULT_TITLE, TITLE_LABELS, TITLE_NAMES } from "@/domain/constants";
import { parseAppPath } from "@/domain/path";
import { Spinner } from "flowbite-react";
import { notFound, usePathname } from "next/navigation";

export default function MAIN() {
  const pathname = usePathname();
  const appPath = parseAppPath(pathname);
  const title = appPath?.title ?? DEFAULT_TITLE;
  const region = appPath?.region ?? "us";
  const realm = appPath?.realm ?? "";
  const character = appPath?.character ?? "";

  const { data: characterData, isLoading, error, isValidating } = useGetCharacterInfo(region, realm, character);
  const {
    data: statsData,
    isLoading: statsIsLoading,
    error: statsError,
    isValidating: statsIsValidating,
  } = useGetStats(title, region);

  if (!appPath?.realm || !appPath?.character) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col items-center">
      {(isLoading || isValidating || statsIsLoading || statsIsValidating) && (
        <div className="my-8">
          <Spinner aria-label="Loader" color="gray" className="w-20 h-20" />
        </div>
      )}
      {(statsError || error) && notFound()}
      {!isLoading &&
        !isValidating &&
        !statsIsLoading &&
        !statsIsValidating &&
        statsData &&
        characterData &&
        !statsError &&
        !error && (
          <>
            <div className="w-full max-w-6xl flex flex-col">
              <div className="flex flex-row w-full">
                <div className="w-1/3 my-4">
                  <div className="flex flex-row">
                    <div className="mr-4">
                      <img src={characterData.thumbnail_url}></img>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <div>{characterData.name}</div>
                        <div className="ml-1">{characterData.guild ? `<${characterData.guild["name"]}>` : ""}</div>
                      </div>
                      <div className="flex flex-row">
                        <div>{characterData.realm}</div>
                        <div className="ml-1">{`(${region.toUpperCase()})`}</div>
                      </div>
                      <div className="flex flex-row">
                        <div>{characterData.active_spec_name}</div>
                        <div className="ml-1">{characterData.class}</div>
                      </div>
                      <div className="flex flex-row text-sm text-gray-500 mt-1">
                        <div>{`${TITLE_NAMES[title]} (${TITLE_LABELS[title]}) title`}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-2/3">
                  <div className="flex flex-row w-full my-4 space-x-4">
                    <div className="w-1/3">
                      <StatPanel title="Region Rank" stat={characterData.mythic_plus_ranks["overall"]["region"]} />
                    </div>
                    <div className="w-1/3">
                      <StatPanel
                        title="Current Score"
                        stat={characterData.mythic_plus_scores_by_season[0]["scores"]["all"]}
                      />
                    </div>
                    <div className="w-1/3">
                      <StatPanel
                        title={`${TITLE_LABELS[title]} cutoff difference`}
                        stat={Math.round(
                          characterData.mythic_plus_scores_by_season[0]["scores"]["all"] - statsData.rating_cutoff
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-bold font-sans mb-2">
                {`Best Dungeons for Characters above ${TITLE_NAMES[title]} (${TITLE_LABELS[title]}) cutoff`}
              </div>
              <div>
                {statsData?.dungeons.map((dungeon) => {
                  return (
                    <div key={dungeon.info.slug} className="my-2.5">
                      <DungeonPanel
                        dungeonStats={dungeon}
                        region={region}
                        season={statsData.season}
                        characterInfo={characterData}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
    </div>
  );
}
