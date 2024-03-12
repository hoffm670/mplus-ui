"use client";

import { Dropdown } from "flowbite-react";
import { FC } from "react";
import Image from "next/image";
import { REGIONS } from "@/domain/constants";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  region: string;
}

export const Header: FC<HeaderProps> = ({ title, region }: HeaderProps) => {
  const router = useRouter();
  return (
    <div className="w-full font-sans">
      <header className="w-full flex justify-center bg-gray-800 text-white text-center py-2 shadow-xl mb-2">
        <div className="max-w-6xl flex flex-row w-full">
          <div className="flex flex-row w-full">
            <div className="flex flex-column justify-center items-center bg-black w-14 h-14 rounded-full">
              <div>
                <Image width={40} height={40} src={"/icon.ico"} alt={""} />
              </div>
            </div>
            <span className="flex items-center font-bold text-2xl ml-3">{title}</span>
          </div>
          <Dropdown color="dark" label={region.toUpperCase()} dismissOnClick={false}>
            {REGIONS.map((region) => {
              return (
                <Dropdown.Item
                  key={`region-dd-${region}`}
                  onClick={() => {
                    router.push(`/${region}`);
                  }}
                >
                  {region.toUpperCase()}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
      </header>
    </div>
  );
};
