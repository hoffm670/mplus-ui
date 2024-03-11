"use client";
import useSWR from "swr";
import { GET_STATS_URL } from "../constants";

const getStats = async (url: string, region: string) => {
  const response = await fetch(`${url}?region=${region}`);
  return response.json();
};

const useGetStats = (region: string) => {
  const { data, error, isValidating } = useSWR<DungeonStatsResponse>(
    GET_STATS_URL,
    (url: string) => getStats(url, region)
  );

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default useGetStats;
