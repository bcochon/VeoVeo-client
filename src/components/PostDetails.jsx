import React, { useEffect, useState } from "react";
import FeedPost from "./feed/FeedPost";
import LoadingSpinner from "./utils/LoadingSpinner";
import usePostService from "../services/postService";
import "./PostDetails.css";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const { getPost } = usePostService();

  function getBackgroundColor() {
    const postColor = post?.colorDay?.color?.value;
    if (!postColor) return 'transparent';
    return postColor + '80';
  }

  function getStyle() {
    const style = {
      backgroundColor: getBackgroundColor(),
    }
    const color = post?.colorDay?.color?.value
    if (color) style['--alternative-color'] = color;
    return style;
  }

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
    <section className="post-details-container" style={getStyle()}>
      {post && <FeedPost post={post} />}
    </section>
  );
}

export default PostDetails;