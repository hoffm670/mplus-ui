"use client";

import { Dropdown } from "flowbite-react";
import { FC } from "react";
import Image from "next/image";
import { REGIONS, SITE_TITLE } from "@/domain/constants";
import { usePathname, useRouter } from "next/navigation";
import { CharacterModal } from "../CharacterModal";

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const region = pathname.split("/")[1];

  return (
    <div className="w-full font-sans">
      <header className="w-full flex justify-center bg-gray-800 text-white text-center py-2 shadow-xl">
        <div className="max-w-6xl flex flex-row w-full">
          <div
            className="flex flex-row w-full cursor-pointer"
            onClick={() => {
              router.push(`/${region}`);
            }}
          >
            <div className="flex flex-column justify-center items-center bg-black w-14 h-14 rounded-full">
              <div>
                <Image width={40} height={40} src={"/icon.ico"} alt={""} unoptimized />
              </div>
            </div>
            <span className="flex items-center font-bold text-2xl ml-3">{SITE_TITLE}</span>
          </div>
          {region && (
            <>
              <CharacterModal region={region} />
              <Dropdown color="dark" label={region.toUpperCase()} dismissOnClick={true}>
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
            </>
          )}
        </div>
      </header>
    </div>
  );
};
