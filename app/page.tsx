"use client";
import { DungeonPanel } from "@/components/DungeonPanel";
import Header from "@/components/Header";
import useGetStats from "@/domain/queries/get-stats";
import { Footer } from "flowbite-react";

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
      <Footer container className="bg-gray-800 justify-start text-sm">
        <div className="flex flex-row">
          <Footer.Brand
            src="https://cdn.raiderio.net/images/brand/Logo_2ColorWhite.png"
            href="https://www.raider.io"
          />
          <div className="flex flex-col justify-center text-sm">
            All data obtained from Raider.io
          </div>
        </div>

        {data?.timestamp && (
          <div className="flex flex-col items-end">
            <span>Last Updated</span>
            <span>{new Date(data?.timestamp * 1000).toLocaleString()}</span>
          </div>
        )}
      </Footer>
    </div>
  );
}
