"use client";
import useSWR from "swr";
import { REGIONS, TITLES, Title } from "../constants";
import { notFound } from "next/navigation";

const getStats = async (url: string, region: string, title: Title) => {
  const response = await fetch(`${url}/${region}?title=${title}`);
  return response.json();
};

const useGetStats = (title: Title, region: string) => {
  const isValid = TITLES.includes(title) && REGIONS.includes(region);
  const { data, error, isValidating } = useSWR<DungeonStatsResponse>(
    isValid ? [process.env.NEXT_PUBLIC_GET_STATS_URL, title, region] : null,
    ([url, title, region]: [string, Title, string]) => getStats(url, region, title),
    { dedupingInterval: Infinity, revalidateOnFocus: false }
  );

  if (!isValid) {
    return notFound();
  }

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default useGetStats;
