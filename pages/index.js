import Loader from "@/components/Loader";
import Post from "@/components/Post";
import axios from "axios";
import { useState, useEffect, useRef, useId } from "react";

export default function Home() {
  const [posts, setPosts] = useState();
  const inputRef = useRef(null);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3002/posts?_sort=-createdAt`);
      console.log({ data });
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitPost = async () => {
    try {
      console.log({ refData: inputRef.current.value });
      const id = crypto.randomUUID();
      const { data } = await axios({
        method: "post",
        url: `http://localhost:3002/posts`,
        data: { content: inputRef.current.value, createdAt: new Date().getTime(), id },
      });
      console.log({ data });
      // setPost(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <div className="inputContainer">
        <input placeholder="Add New Post" type="text" ref={inputRef} />
        <button className="submitBtn" onClick={() => submitPost()}>
          Submit
        </button>
      </div>
      {posts ? (
        posts?.map((item) => {
          return <Post key={item.id} {...item}></Post>;
        })
      ) : (
        <Loader></Loader>
      )}
    </section>
  );
}
