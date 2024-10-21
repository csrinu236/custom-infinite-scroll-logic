import Loader from "@/components/Loader";
import Post from "@/components/Post";
import { fetcher } from "@/utils/fetcher";
import { swrFetcher } from "@/utils/swrFetcher";
import { swrInfiniteFetcher } from "@/utils/swrInfinite";
import { useSwrInfiniteFetcher } from "@/utils/useSwrInfinite";
import axios from "axios";
import { useState, useEffect, useRef, useId, useCallback } from "react";
import useSWR from "swr";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteFetcher from "@/utils/useInfiniteFetcher";

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

  // const { data, error, isLoading, mutate } = swrFetcher(`http://localhost:3002/posts?_sort=createdAt&_order=desc`);
  // const { data, lastElementRef, isLoading, mutate, setSize, size, hasMoreFlagFromServer } = useSwrInfiniteFetcher(`http://localhost:3002/posts`);
  const { data, lastElementRef, isLoading, mutate, setSize, size, error, hasMoreFlagFromServer } = useInfiniteFetcher(`http://localhost:3002/posts`);

  useEffect(() => {
    if (data) {
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
      {posts?.map((item, index) => {
        if (posts.length === index + 1) {
          return <Post ref={lastElementRef} key={item.id} {...item}></Post>;
        }
        return <Post key={item.id} {...item}></Post>;
      })}
      {isLoading && <Loader></Loader>}

      {/* set limit to 2 in the api and you will see this won't work */}
      {/* Intersection observer >> InfiniteScroll */}
      {/* <InfiniteScroll
        className="infiniteScrollComponent"
        dataLength={posts?.length || 0} //This is important field to render the next data
        next={() => setSize(size + 1)}
        hasMore={hasMoreFlagFromServer}
        loader={<Loader></Loader>}
        endMessage={<h1>Reached end...</h1>}
        scrollableTarget={"main"}
      >
        {posts?.map((item) => {
          return <Post key={item.id} {...item}></Post>;
        })}
      </InfiniteScroll> */}
    </section>
  );
}
