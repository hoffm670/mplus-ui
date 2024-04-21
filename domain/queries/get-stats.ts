"use client";
import useSWR from "swr";
import { GET_STATS_URL, REGIONS } from "../constants";
import { notFound } from "next/navigation";

const getStats = async (url: string, region: string) => {
  const response = await fetch(`${url}/${region}`);
  return response.json();
};

const useGetStats = (region: string) => {
  if (!REGIONS.includes(region)) {
    return notFound();
  }
  const { data, error, isValidating } = useSWR<DungeonStatsResponse>(
    GET_STATS_URL,
    (url: string) => getStats(url, region),
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
