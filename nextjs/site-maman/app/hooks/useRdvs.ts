import useSWR from "swr";

import fetcher from "../lib/fetcher";

const useRdvs = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/rdvs", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });

  return { data, error, isLoading, mutate };
};

export default useRdvs;
