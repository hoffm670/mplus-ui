import { FC } from "react";
import { Footer as FlowFooter } from "flowbite-react";

interface FooterProps {
  updatedTimestamp?: number;
}

export const Footer: FC<FooterProps> = ({ updatedTimestamp }) => {
  return (
    <FlowFooter
      container
      className="bg-gray-800 text-sm rounded-none mt-4 flex items-center justify-between min-w-[768px]"
    >
      <div className="flex flex-row">
        <FlowFooter.Brand
          src="https://cdn.raiderio.net/images/brand/Logo_2ColorWhite.png"
          href="https://www.raider.io"
        />
        <div className="flex flex-col justify-center text-sm">
          All data obtained from Raider.io
        </div>
      </div>

      {updatedTimestamp && (
        <div className="flex flex-col items-end">
          <span>Last Updated</span>
          <span>{new Date(updatedTimestamp * 1000).toLocaleString()}</span>
        </div>
      )}
    </FlowFooter>
  );
};