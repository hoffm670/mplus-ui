"use client";

import { BIG_RAIDER_LOGO, RAIDER_IO } from "@/domain/constants";
import useGetStats from "@/domain/queries/get-stats";
import { Footer as FlowFooter } from "flowbite-react";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const Footer: FC = () => {
  const pathname = usePathname();
  const region = pathname.split("/")[1];
  const { data, isLoading, error, isValidating } = useGetStats(region);

  return (
    <div className="w-full bg-gray-800 flex flex-row justify-center min-w-[768px] h-[88px]">
      <FlowFooter
        container
        className=" bg-gray-800 text-sm rounded-none flex items-center justify-between max-w-7xl mt-0 shadow-none"
      >
        <div className="flex flex-row ">
          <FlowFooter.Brand src={BIG_RAIDER_LOGO} href={RAIDER_IO} />
          <div className="flex flex-col justify-center text-sm">Data from Raider.io</div>
        </div>

        {!isLoading && !isValidating && data?.timestamp && (
          <div className="flex flex-col items-end">
            <span>Last Updated</span>
            <span>{new Date(data?.timestamp * 1000).toLocaleString()}</span>
          </div>
        )}
      </FlowFooter>
    </div>
  );
};
