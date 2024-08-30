import useSWRInfinite from "swr/infinite";
import { infiniteFetcher } from "./fetcher";
import { useRef, useCallback } from "react";

export const useSwrInfiniteFetcher = (url) => {
  const getKey = (pageIndex, previousPageData) => {
    pageIndex = pageIndex + 1;

    if ((previousPageData && !previousPageData?.list.length) || !url) return null; // reached the end
    return `${url}?_page=${pageIndex}&_limit=1&_sort=createdAt&_order=desc`; // SWR key
  };
  // if you pass empty string/null to useSWR(null, fetcher) =>
  const { data, error, isValidating, size, setSize, mutate } = useSWRInfinite(getKey, infiniteFetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateFirstPage: false,
  });

  const hasMoreFlagFromServer = data?.[size - 1]?.hasMorePages == undefined ? true : data?.[size - 1]?.hasMorePages;
  console.log({ hasMoreFlagFromServer });
  const isLoading = !data?.[size - 1] && !error;

  // gets called whenever lastelement ref is created,
  // so we need to observe that lastNode and when lastNode is observed,
  // in that call back fn(fetch next page), disconnect last observed node and observe new node
  const observer = useRef(null);
  const lastElementRef = useCallback(
    (node) => {
      // console.log(node);
      if (isLoading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreFlagFromServer) {
            console.log("Visisbile");
            console.log({ size });
            setSize(size + 1);
          }
        },
        {
          threshold: 1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [data]
  );

  return { lastElementRef, isLoading, hasMoreFlagFromServer, size, setSize, data, mutate };
};
