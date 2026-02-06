import React, { useEffect, useState } from "react";
import FeedPost from "./feed/FeedPost";
import LoadingSpinner from "./utils/LoadingSpinner";
import usePostService from "../services/postService";
import "./PostDetails.css";
import { useColor } from "../context/ColorContext";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const { getPost } = usePostService();

  const { changeColor, returnColor } = useColor();

  useEffect(() => {
    return () => {
      returnColor();
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        if (!postId) return;
        setLoading(true);
        const data = await getPost(postId);
        setPost(data?.data);
        changeColor(data?.data?.colorDay?.color?.value);
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
      {post && <FeedPost post={post} />}
    </section>
  );
}

export default PostDetails;