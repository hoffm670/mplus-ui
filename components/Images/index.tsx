import Image from "next/image";
import { FC } from "react";

interface ImageProps {
  width: number;
  height: number;
}

export const Tyrannical: FC<ImageProps> = ({ width, height }: ImageProps) => {
  return (
    <Image
      className="rounded-sm"
      alt="Tyrannical"
      width={width}
      height={height}
      src="/tyrannical.jpg"
    />
  );
};

export const Fortified: FC<ImageProps> = ({ width, height }: ImageProps) => {
  return (
    <Image
      className="rounded-sm"
      alt="Fortified"
      width={width}
      height={height}
      src="/fortified.jpg"
    />
  );
};
