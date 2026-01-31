import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import LoginModal from "../components/modals/LoginModal";
import PostDetails from "../components/PostDetails";
import './PostView.css';

const PostView = () => {
  const { postId } = useParams();

  return (
    <main className="post-view-container">
      <Header />
      <PostDetails postId={postId} />
      <NotificationsModal />
      <LoginModal />
      <Footer />
    </main>
  );
}

export default PostView;