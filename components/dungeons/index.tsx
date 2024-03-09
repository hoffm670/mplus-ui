import { FC } from "react";
import Image from "next/image";
import { getDungeonInfo } from "./helper";

interface DungeonIconProps {
  height: number;
  width: number;
  dungeonShort: string;
}

export const DungeonIcon: FC<DungeonIconProps> = (props: DungeonIconProps) => {
  const dungeonInfo = getDungeonInfo(props.dungeonShort);
  return (
    <Image
      alt={dungeonInfo.alt}
      width={props.width}
      height={props.height}
      src={dungeonInfo.url}
    />
  );
};
