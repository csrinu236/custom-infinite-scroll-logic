import useSWRInfinite from "swr/infinite";
import { fetcher } from "./fetcher";

const getKey = (pageIndex, previousPageData) => {
  pageIndex = pageIndex + 1;

  if (previousPageData && !previousPageData?.list.length) return null; // reached the end
  return `http://localhost:3002/posts?_page=${pageIndex}&_limit=6&_sort=createdAt&_order=desc`; // SWR key
};

export const swrInfiniteFetcher = () => {
  // if you pass empty string/null to useSWR(null, fetcher) =>
  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateFirstPage: false,
  });
};
