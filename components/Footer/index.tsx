import { FC } from "react";
import { Footer as FlowFooter } from "flowbite-react";
import { BIG_RAIDER_LOGO, RAIDER_IO } from "@/domain/constants";

interface FooterProps {
  updatedTimestamp?: number;
}

export const Footer: FC<FooterProps> = ({ updatedTimestamp }) => {
  return (
    <div className="w-full bg-gray-800 mt-4 flex flex-row justify-center min-w-[768px]">
      <FlowFooter
        container
        className=" bg-gray-800 text-sm rounded-none flex items-center justify-between max-w-7xl mt-0 shadow-none"
      >
        <div className="flex flex-row ">
          <FlowFooter.Brand src={BIG_RAIDER_LOGO} href={RAIDER_IO} />
          <div className="flex flex-col justify-center text-sm">Data from Raider.io</div>
        </div>

        {updatedTimestamp && (
          <div className="flex flex-col items-end">
            <span>Last Updated</span>
            <span>{new Date(updatedTimestamp * 1000).toLocaleString()}</span>
          </div>
        )}
      </FlowFooter>
    </div>
  );
};
