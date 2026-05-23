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
      <header className="w-full flex justify-center bg-gray-800 text-white text-center py-2 shadow-xl">
        <div className="max-w-6xl flex flex-row w-full">
          <div
            className="flex flex-row w-full cursor-pointer"
            onClick={() => {
              router.push(buildAppPath({ title, region, realm, character }));
            }}
          >
            <div className="flex flex-column justify-center items-center bg-black w-14 h-14 rounded-full">
              <div>
                <Image width={40} height={40} src={"/icon.ico"} alt={""} unoptimized />
              </div>
            </div>
            <span className="flex items-center font-bold text-2xl ml-3">{SITE_TITLE}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CharacterModal title={title} region={region} />
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
      </header>
    </div>
  );
};
