"use client";
import useSWR from "swr";
import { REGIONS } from "../constants";
import { notFound } from "next/navigation";

const RAIDER_URL: string = "https://raider.io/api/v1/characters/profile";
const FIELDS: string[] = [
  "mythic_plus_best_runs",
  "mythic_plus_ranks",
  "mythic_plus_scores_by_season:current",
  "guild",
];

const getCharacterInfo = async (url: string, region: string, realm: string, character: string) => {
  const searchParams = new URLSearchParams({
    region: region,
    realm: realm,
    name: character,
    fields: FIELDS.join(","),
  });

  const response = await fetch(`${url}?${searchParams}`, { cache: "no-store" });
  return response.json();
};

const useGetCharacterInfo = (region: string, realm: string, character: string) => {
  if (!REGIONS.includes(region)) {
    return notFound();
  }
  const { data, error, isValidating } = useSWR<CharacterInfo>(
    RAIDER_URL,
    (url: string) => getCharacterInfo(url, region, realm, character),
    {
      dedupingInterval: Infinity,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default useGetCharacterInfo;
