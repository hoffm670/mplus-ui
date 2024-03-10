"use client";
import useSWR from "swr";

const getStats = async (url: string) => {
  const response = await fetch(
    // "https://mplus-api-svjsm5n2iq-uc.a.run.app/stats"
    url
  );
  return response.json();
};

const useGetStats = () => {
  const { data, error, isValidating } = useSWR<DungeonStatsResponse>(
    "http://localhost:8081/stats",
    getStats
  );

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default useGetStats;
