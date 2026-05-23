"use client";
import useSWR from "swr";
import { REGIONS, TITLES, Title } from "../constants";
import { notFound } from "next/navigation";

const getStats = async (url: string, region: string, title: Title) => {
  const response = await fetch(`${url}/${region}?title=${title}`);
  return response.json();
};

const useGetStats = (title: Title, region: string) => {
  if (!TITLES.includes(title) || !REGIONS.includes(region)) {
    return notFound();
  }
  const { data, error, isValidating } = useSWR<DungeonStatsResponse>(
    [process.env.NEXT_PUBLIC_GET_STATS_URL, title, region],
    ([url, title, region]: [string, Title, string]) => getStats(url, region, title),
    { dedupingInterval: Infinity, revalidateOnFocus: false }
  );

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default useGetStats;
