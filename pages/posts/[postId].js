import Loader from "@/components/Loader";
import { swrFetcher } from "@/utils/swrFetcher";
import { useSwrInfiniteFetcher } from "@/utils/useSwrInfinite";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useRef } from "react";

const SinglePost = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState();
  const [post, setPost] = useState();
  const inputRef = useRef(null);

  const { data, lastElementRef, isLoading, mutate } = useSwrInfiniteFetcher(postId ? `http://localhost:3002/posts/${postId}/comments` : null);

  useEffect(() => {
    if (data) {
      setComments(data.map((singlePageResp) => singlePageResp.list).flat());
    }
  }, [data]);

  // const getPost = async (postId) => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:3002/posts/${postId}`);
  //     console.log({ data });
  //     setPost(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const { data: singlePost, error, mutate: singlePostMutate } = swrFetcher(postId ? `http://localhost:3002/posts/${postId}` : null);

  const submitComment = async () => {
    try {
      // console.log({ refData: inputRef.current.value });
      const { data } = await axios({
        method: "post",
        url: `http://localhost:3002/comments`,
        data: { content: inputRef.current.value, createdAt: new Date().getTime(), postId: postId },
      });
      console.log({ data });
      // setPost(data);
      inputRef.current.value = "";
      mutate();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (postId && singlePost) {
      console.log("jjjjjj");
      setPost(singlePost);
    }
  }, [singlePost, postId]);

  return (
    <section className="singlePost">
      {post ? (
        <>
          <h2>Title: {post?.content}</h2>
          <h3>CreatedAt: {post?.createdAt}</h3>
        </>
      ) : (
        <Loader></Loader>
      )}
      <div className="inputContainer">
        <input type="text" ref={inputRef} />
        <button className="submitBtn" onClick={() => submitComment()}>
          Submit
        </button>
      </div>
      {comments?.map((com, index) => {
        if (comments.length - 1 === index) {
          return (
            <p ref={lastElementRef} className="comment" key={com?.id}>
              {com?.content}
            </p>
          );
        }
        return (
          <p className="comment" key={com?.id}>
            {com?.content}
          </p>
        );
      })}
      {isLoading && <Loader></Loader>}
    </section>
  );
};

export default SinglePost;
