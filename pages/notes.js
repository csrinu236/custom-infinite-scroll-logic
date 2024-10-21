import React from "react";

const Notes = () => {
  return (
    <div>
      <div className="comment">Excessive API query: every time network request goes when you come back to previously fetched route</div>
      <div className="comment">When All posts are fetched, fetching post/1 should not make another API call</div>
      <div className="comment">Don&apos;t fetch again and again until it succeeds</div>
      <div className="comment">Don&apos;t mutate data when db ka data changes</div>
    </div>
  );
};

export default Notes;
