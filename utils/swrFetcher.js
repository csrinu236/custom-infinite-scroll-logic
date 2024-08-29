import useSWR from "swr";
import { fetcher } from "./fetcher";

export const swrFetcher = (...urls) => {
  // console.log(!urls[0]);

  // if you pass empty string/null to useSWR(null, fetcher) =>
  return useSWR(...urls, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    // dedupingInterval: 10000, // if the app gets duplicate request for the same url within 10seconds, it won't make the request
    // default value 1sec
  });
};
