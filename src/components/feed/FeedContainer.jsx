import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import LoadingSpinner from "../utils/LoadingSpinner";
import { getPosts } from "../../services/postService";
import "./FeedContainer.css";

function FeedContainer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPosts();
        setPosts(data?.data || []);
      } catch(err) {
        console.error('Error obteniendo posts para feed:', err);
        setError(err);
      } finally {
        setLoading(false);
      }

    };
    load();
  }, []);

  if (loading) return (
    <section className="feed-container">
      <LoadingSpinner label=''/>
    </section>
  );

  return (
    <section className="feed-container">
      <div id="feedTop" className="empty-header-placeholder fixed-top">
        <span></span>
      </div>
      {posts?.length > 0 ? (
        posts.map((post) => <FeedPost post={post} key={post.id} />)
      ) : (
        <p>Parece que aún no hay publicaciones</p>
      )}
      <span className="empty-footer-placeholder" />
    </section>
  );
}

export default FeedContainer;