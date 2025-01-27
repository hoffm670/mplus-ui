"use client";
import useSWR from "swr";
import { REGIONS } from "../constants";
import { notFound } from "next/navigation";

const RAIDER_URL = "https://raider.io/api/v1/characters/profile";

const getCharacterInfo = async (url: string, region: string, realm: string, character: string) => {
  const searchParams = new URLSearchParams({
    region: region,
    realm: realm,
    name: character,
    fields: "mythic_plus_best_runs,mythic_plus_ranks,mythic_plus_scores_by_season:current,guild",
  }); // TODO

  const response = await fetch(`${url}?${searchParams}`);
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
