import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteFetcher = (url) => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`http://localhost:3002/posts?_page=${size}&_limit=6&_sort=createdAt&_order=desc`);
      const linkHeader = resp.headers.get("Link");
      const hasMorePages = linkHeader && linkHeader.includes('rel="next"');
      if (hasMorePages) {
        console.log("More pages exist");
      } else {
        console.log("No more pages");
      }
      if (!resp.ok) {
        const error = await resp.json();
        throw error;
      }
      const result = {};
      result.list = await resp.json();
      result.hasMorePages = hasMorePages;
      console.log(result);
      setData((prev) => {
        return [...prev, result];
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const hasMoreFlagFromServer = isLoading ? true : data?.[size - 1]?.hasMorePages;
  console.log({ hasMoreFlagFromServer });
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

  useEffect(() => {
    fetchData();
  }, [size]);

  return { data, isLoading, size, setSize, lastElementRef, error, hasMoreFlagFromServer };
};

export default useInfiniteFetcher;
