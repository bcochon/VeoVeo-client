import React, { useState, useEffect } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import PostsGrid from "./PostsGrid";
import { getPosts } from "../../services/postService";
import "./ProfileContainer.css";

function ProfileContainer({ userData }) {
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [userPosts, setUserPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPosts();
        setPostsCount(data?.total || 0);
        setUserPosts(data?.data || []);
      } catch(err) {
        console.error('Error obteniendo posts para feed:', err);
        setError(err);
      } finally {
        setLoading(false);
      }

    };
    load();
  }, []);

  if (loading)
    return (
      <section className="profile-container">
        <LoadingSpinner label="" />
      </section>
    );

  return (
    <section className="profile-container">
      <div className="empty-header-placeholder fixed-top">
        <span></span>
      </div>
      <div className="profile-details">
        <a href="/profile" className="profile-picture-link">
          <img
            className="profile-picture"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFneGOyzd0Mnt9VzYVFrwSMtOrloq_DJTBA&s"
            alt="Foto de perfil"
          />
        </a>
        <h3 className="profile-username">{userData?.username}</h3>
        <div className="profile-data">
          <div className="profile-data-item">
            <span className="profile-data-number">{postsCount}</span>
            <h4>Fotos</h4>
          </div>
          <div className="profile-data-item">
            <span className="profile-data-number">{followers}</span>
            <h4>Seguidores</h4>
          </div>
          <div className="profile-data-item">
            <span className="profile-data-number">{following}</span>
            <h4>Seguidos</h4>
          </div>
        </div>
        <PostsGrid posts={userPosts} />
      </div>
      <span className="empty-footer-placeholder" />
    </section>
  );
}

export default ProfileContainer;