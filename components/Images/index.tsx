import Image from "next/image";
import { FC } from "react";

interface ImageProps {
  width: number;
  height: number;
}

export const BlackRookHold: FC<ImageProps> = ({
  width,
  height,
}: ImageProps) => {
  return (
    <Image alt="Black Rook Hold" width={width} height={height} src="/brh.jpg" />
  );
};

export const Tyrannical: FC<ImageProps> = ({ width, height }: ImageProps) => {
  return (
    <Image
      alt="Tyrannical"
      width={width}
      height={height}
      src="/tyrannical.jpg"
    />
  );
};

export const Fortified: FC<ImageProps> = ({ width, height }: ImageProps) => {
  return (
    <Image alt="Fortified" width={width} height={height} src="/fortified.jpg" />
  );
};
