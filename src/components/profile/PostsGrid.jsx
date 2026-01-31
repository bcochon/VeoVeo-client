import React from "react";
import "./PostsGrid.css";

function PostsGrid({ posts, loading = false }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <a className="grid-post-link" key={post?.id}>
          <img
            className="grid-post-image"
            src={post?.image?.url}
            alt={`Publicación de ${post?.user?.username}`}
          />
        </a>
      ))}
    </div>
  );
}

export default PostsGrid;