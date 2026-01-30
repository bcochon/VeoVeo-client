import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "./FeedPost.css";

function FeedPost({ post }) {
  const [liked, setLiked] = useState(false);

  const buildAltText = (post) => {
    return `Publicación de ${post?.user?.username}: ${post?.description || 'Sin descripción'}`;
  }

  const buildPostHour = (post) => {
    if (!post?.createdAt) return "";
    const postDate = new Date(post.createdAt);
    return postDate.toLocaleTimeString();
  }

  const handleLike = () => {
    setLiked(!liked);
  }

  return (
    <div className="feed-post-container">
      <div className="feed-post-header">
        <div className="feed-post-user-details">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFneGOyzd0Mnt9VzYVFrwSMtOrloq_DJTBA&s"
            alt="Foto del usuario"
            className="user-picture"
          />
          <div className="feed-post-username-container">
            <span className="feed-post-username">{post?.user?.username}</span>
            <span className="feed-post-time">A las {buildPostHour(post)}</span>
          </div>
        </div>
        <button type="button" className="feed-post-options">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
      <img
        src={post?.image?.url}
        alt={buildAltText(post)}
        className="feed-post-image"
      />
      <div className="feed-post-actions">
        <button
          type="button"
          onClick={handleLike}
          className={
            "feed-post-action-button feed-post-like" + (liked ? " liked" : "")
          }
          aria-label="Me gusta"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          type="button"
          className="feed-post-action-button feed-post-comments"
          aria-label="Comentarios"
        >
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>
      <div className="feed-post-details"></div>
    </div>
  );
}

export default FeedPost;