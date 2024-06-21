import { FC } from "react";
import Image from "next/image";
import { getDungeonInfo, DungeonIconInfo } from "./helper";

interface DungeonIconProps {
  size: number;
  dungeonShort: string;
  [rest: string]: any;
}

export const DungeonIcon: FC<DungeonIconProps> = ({ size, dungeonShort, ...rest }) => {
  const dungeonInfo: DungeonIconInfo = getDungeonInfo(dungeonShort);
  return (
    <>
      {dungeonInfo && (
        <Image {...rest} alt={dungeonInfo.alt} width={size} height={size} src={dungeonInfo.url} unoptimized />
      )}
    </>
  );
};
