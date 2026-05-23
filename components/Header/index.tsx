"use client";

import { Dropdown } from "flowbite-react";
import { FC } from "react";
import Image from "next/image";
import { REGIONS, SITE_TITLE, TITLE_LABELS, TITLES, Title } from "@/domain/constants";
import { buildAppPath, parseAppPath } from "@/domain/path";
import { usePathname, useRouter } from "next/navigation";
import { CharacterModal } from "../CharacterModal";

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const appPath = parseAppPath(pathname);

  if (!appPath) {
    return null;
  }

  const { title, region, realm, character } = appPath;

  return (
    <div className="w-full font-sans">
      <header className="w-full flex justify-center bg-gray-800 text-white py-2 shadow-xl">
        <div className="max-w-7xl flex flex-row w-full items-center gap-4 flex-nowrap px-4">
          <div
            className="flex flex-row items-center min-w-0 flex-1 cursor-pointer"
            onClick={() => {
              router.push(buildAppPath({ title, region, realm, character }));
            }}
          >
            <div className="flex shrink-0 justify-center items-center bg-black w-14 h-14 rounded-full">
              <Image width={40} height={40} src={"/icon.ico"} alt={""} unoptimized />
            </div>
            <span className="font-bold text-2xl ml-3 truncate">{SITE_TITLE}</span>
          </div>
          <div className="flex flex-row items-center gap-2 shrink-0 flex-nowrap">
            <CharacterModal title={title} region={region} />
            <div className="shrink-0 min-w-[4.5rem]">
              <Dropdown color="dark" label={TITLE_LABELS[title]} dismissOnClick={true}>
                {TITLES.map((titleOption) => {
                  return (
                    <Dropdown.Item
                      key={`title-dd-${titleOption}`}
                      onClick={() => {
                        router.push(buildAppPath({ title: titleOption, region, realm, character }));
                      }}
                    >
                      {TITLE_LABELS[titleOption as Title]}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
            </div>
            <div className="shrink-0 min-w-[4.5rem]">
              <Dropdown color="dark" label={region.toUpperCase()} dismissOnClick={true}>
                {REGIONS.map((regionOption) => {
                  return (
                    <Dropdown.Item
                      key={`region-dd-${regionOption}`}
                      onClick={() => {
                        router.push(buildAppPath({ title, region: regionOption, realm, character }));
                      }}
                    >
                      {regionOption.toUpperCase()}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
