import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { setLikePost } from "../../services/postService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./FeedPost.css";

function FeedPost({ post }) {
  const [liked, setLiked] = useState(post?.liked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);
  const [doubleClickTimer, setDoubleClickTimer] = useState(null);
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const buildAltText = (post) => 
    `Publicación de ${post?.user?.username}: ${post?.description || 'Sin descripción'}`;

  const buildPostHour = (post) => {
    if (!post?.createdAt) return "";
    const postDate = new Date(post.createdAt);
    return postDate.toLocaleTimeString();
  };

  const handleLike = (e) => {
    e.preventDefault();
    if (!user) {
      openLoginModal();
      return;
    }
    const newState = !liked;
    setLiked(newState);
    setLikePost(post?.id, newState);
    setLikeCount(newState? likeCount+1 : likeCount-1);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const nowSecond = new Date();
    if (!doubleClickTimer || (nowSecond - doubleClickTimer) > 350) {
      setDoubleClickTimer(nowSecond);
      return;
    }
    if (!user) {
      return;
    }
    if (liked) {
      return;
    }
    setLiked(true);
    setLikePost(post?.id, true);
    setLikeCount(likeCount + 1);
  };

  const goToUser = (e) => {
    e.preventDefault();
    navigate(`/users/${post?.user?.id}`);
  }

  return (
    <div className="feed-post-container">
      <div className="feed-post-header">
        <button
          type="button"
          onClick={goToUser}
          className="feed-post-user-details"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFneGOyzd0Mnt9VzYVFrwSMtOrloq_DJTBA&s"
            alt="Foto del usuario"
            className="user-picture"
          />
          <div className="feed-post-username-container">
            <span className="feed-post-username">{post?.user?.username}</span>
            <span className="feed-post-time">A las {buildPostHour(post)}</span>
          </div>
        </button>
        <button type="button" className="feed-post-options">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
      <button
        type="button"
        onClick={handleDoubleClick}
        className="feed-post-image-container"
      >
        <img
          src={post?.image?.url}
          alt={buildAltText(post)}
          className="feed-post-image"
        />
      </button>
      <div className="feed-post-actions">
        <div className="feed-post-action feed-post-like">
          <button
            type="button"
            onClick={handleLike}
            className={
              "feed-post-action-button feed-post-like-button" +
              (liked ? " liked" : "")
            }
            aria-label="Me gusta"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span className="post-like-count">{likeCount}</span>
        </div>
        <div className="feed-post-action feed-post-comments">
          <button
            type="button"
            className="feed-post-action-button"
            aria-label="Comentarios"
          >
            <FontAwesomeIcon icon={faComment} />
          </button>
        </div>
      </div>
      <div className="feed-post-details"></div>
    </div>
  );
}

export default FeedPost;