import React, { useEffect, useState } from "react";
import { getPost } from "../services/postService";
import FeedPost from "./feed/FeedPost";
import LoadingSpinner from "./utils/LoadingSpinner";
import "./PostDetails.css";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!postId) return;
        setLoading(true);
        const data = await getPost(postId);
        setPost(data?.data);
      } catch(err) {
        console.error('Error obteniendo post de servidor:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [postId]);

  if (loading) return (
    <section className="post-details-container">
      <LoadingSpinner label=''/>
    </section>
  );

  return (
    <section className="post-details-container">
      { post && <FeedPost post={post}/>}
    </section>
  );
}

export default PostDetails;