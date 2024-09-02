import React from "react";
import { useInfiniteQuery } from "react-query";
import { useReducer, useState, useEffect, useCallback } from "react";
import { infiniteFetcher } from "./fetcher";

// pageParam will be supplied by getNextPageParam
const reactQueryFetcher = async ({ pageParam = 1 }) => {
  return infiniteFetcher(`http://localhost:3002/posts?_page=${pageParam}&_limit=6&_sort=createdAt&_order=desc`);
};

const useReactQueryInfinite = () => {
  const { data, fetchNextPage, isLoading, isRefetching } = useInfiniteQuery(["posts"], reactQueryFetcher, {
    getNextPageParam: (lastPage, allPages) => {
      console.log({ lastPage, allPages });

      if (lastPage?.hasMorePages) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (data) => {
      // for tapping the data and modify it
      return data?.pages;
    },
  });

  const observer = useReducer(null);
  const lastElementRef = useCallback(
    (node) => {
      // console.log(node);
      if (isLoading) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("Visisbile");
            fetchNextPage();
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

  return { data, fetchNextPage, isLoading, isRefetching, lastElementRef };
};

export default useReactQueryInfinite;
