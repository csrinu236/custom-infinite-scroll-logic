import Loader from "@/components/Loader";
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

  const getComments = async (postId) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/posts/${postId}/comments?_sort=-createdAt`);
      setComments(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPost = async (postId) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/posts/${postId}`);
      console.log({ data });
      setPost(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitComment = async () => {
    try {
      console.log({ refData: inputRef.current.value });
      const { data } = await axios({
        method: "post",
        url: `http://localhost:3002/comments`,
        data: { content: inputRef.current.value, createdAt: new Date().getTime(), postId: postId },
      });
      console.log({ data });
      // setPost(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("jjjjjj");
    if (postId) {
      getComments(postId);
      getPost(postId);
    }
  }, [postId]);

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
      {comments ? (
        comments.map((com) => {
          return (
            <p className="comment" key={com?.id}>
              {com?.content}
            </p>
          );
        })
      ) : (
        <Loader></Loader>
      )}
    </section>
  );
};

export default SinglePost;
