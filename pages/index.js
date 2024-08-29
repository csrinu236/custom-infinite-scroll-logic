import Loader from "@/components/Loader";
import Post from "@/components/Post";
import { fetcher } from "@/utils/fetcher";
import { swrFetcher } from "@/utils/swrFetcher";
import { swrInfiniteFetcher } from "@/utils/swrInfinite";
import axios from "axios";
import { useState, useEffect, useRef, useId, useCallback } from "react";
import useSWR from "swr";

export default function Home() {
  const [posts, setPosts] = useState();
  const inputRef = useRef(null);

  // const getPosts = async () => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:3002/posts?_sort=-createdAt`);
  //     console.log({ data });
  //     setPosts(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const submitPost = async (content) => {
    try {
      const id = crypto.randomUUID();
      const { data } = await axios({
        method: "post",
        url: `http://localhost:3002/posts`,
        data: { content: content || inputRef.current.value, createdAt: new Date().getTime(), id },
      });
      console.log({ data });
      mutate();
      inputRef.current.value = "";
      // setPost(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const observer = useRef(null);

  // const { data, error, isLoading, mutate } = swrFetcher(`http://localhost:3002/posts?_sort=createdAt&_order=desc`);
  const { data, error, isValidating, size, setSize } = swrInfiniteFetcher();
  console.log(data);
  const hasMoreFlagFromServer = data?.[size - 1]?.hasMorePages;
  console.log({ hasMoreFlagFromServer });
  const isLoading = !data?.[size - 1] && !error;

  console.log({ isLoading });

  // gets called whenever lastelement ref is created,
  // so we need to observe that lastNode and when lastNode is observed,
  // in that call back fn(fetch next page), disconnect last observed node and observe new node
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
    if (data) {
      // console.log(data);
      // console.log(data.map((eachPageResp) => eachPageResp.list).flat());
      setPosts(data.map((eachPageResp) => eachPageResp.list).flat());
    }
  }, [data]);

  return (
    <section>
      <div className="inputContainer">
        <input placeholder="Add New Post" type="text" ref={inputRef} />
        <button className="submitBtn" onClick={() => submitPost()}>
          Submit
        </button>
      </div>
      {/* {console.log({ posts })} */}
      {posts?.map((item, index) => {
        if (posts.length === index + 1) {
          return <Post ref={lastElementRef} key={item.id} {...item}></Post>;
        }
        return <Post key={item.id} {...item}></Post>;
      })}
      {isLoading && <Loader></Loader>}
    </section>
  );
}
