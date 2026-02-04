import React from "react";
import { Link } from "react-router-dom";
import "./PostsGrid.css";

function PostsGrid({ posts, loading = false }) {
  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <Link className="grid-post-link" to={`/posts/${post?.id}`} key={post?.id}>
          <img
            className="grid-post-image"
            src={post?.image?.url}
            alt={`Publicación de ${post?.user?.username}`}
          />
        </Link>
      ))}
    </div>
  );
}

export default PostsGrid;