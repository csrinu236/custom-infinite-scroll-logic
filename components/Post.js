import Link from "next/link";
import React from "react";

const Post = ({ id, content, createdAt }, ref) => {
  return (
    <Link ref={ref} href={`/posts/${id}`} className="post">
      <h4>Post Id: {id}</h4>
      <h2>Content: {content}</h2>
    </Link>
  );
};

export default React.forwardRef(Post);
