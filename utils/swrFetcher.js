import { fetcher } from "./fetcher";

const { default: useSWR } = require("swr");

export const swrFetcher = (...urls) => {
  // if you pass empty string/null to useSWR(null, fetcher) =>
  return useSWR(...urls, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: true,
    // dedupingInterval: 10000, // if the app gets duplicate request for the same url within 10seconds, it won't make the request
    // default value 1sec
  });
};
