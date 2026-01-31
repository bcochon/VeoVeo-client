import React, { useState, useEffect } from "react";
import FeedPost from "./FeedPost";
import LoadingSpinner from "../utils/LoadingSpinner";
import { getDayPosts } from "../../services/postService";
import { useColor } from "../../context/ColorContext";
import "./FeedContainer.css";

function FeedContainer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { colorDay } = useColor();

  useEffect(() => {
    const load = async () => {
      if (!colorDay)
        return;
      try {
        setLoading(true);
        setError('');
        const data = await getDayPosts(colorDay.id);
        setPosts(data?.data || []);
      } catch(err) {
        console.error('Error obteniendo posts para feed:', err);
        setError(err);
      } finally {
        setLoading(false);
      }

    };
    load();
  }, [colorDay]);

  if (loading) return (
    <section className="feed-container">
      <LoadingSpinner label=''/>
    </section>
  );

  return (
    <section className="feed-container">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <a
            href={`/posts/${post?.id}`}
            key={post.id}
            className="feed-post-link"
            aria-label="Ver detalles de publicación"
          >
            <FeedPost post={post} />
          </a>
        ))
      ) : (
        <div className="placeholder-message">
          <p>Parece que aún nadie publicó nada hoy... ¿Y si sos el primero?</p>
        </div>
      )}
    </section>
  );
}

export default FeedContainer;