import React from "react";
import FeedPost from "./FeedPost";
import "./FeedContainer.css";

function FeedContainer() {
  const mockPosts = [
    {
      id: 1,
      image: {
        id: 1,
        url: "https://res.cloudinary.com/deq80boxs/image/upload/c_limit,f_auto,q_auto,w_1200/v1/users/1/users/1/upload_1769481234?_a=BAMAOGDh0",
        mimeType: "image/jpg",
      },
      description: "Este es el primer post de VeoVeo",
      colorDay: {
        date: "2026-01-26T03:00:00.000Z",
        color: {
          id: 1,
          name: "blanco",
          value: "#FFFFFF",
        },
      },
      user: {
        id: 1,
        username: "esoxo",
        email: "esoxo@test.com",
      },
      createdAt: "2026-01-27T02:46:55.000Z",
    },
    {
      id: 2,
      image: {
        id: 1,
        url: "https://res.cloudinary.com/deq80boxs/image/upload/c_limit,f_auto,q_auto,w_1200/v1/users/1/users/1/upload_1769481234?_a=BAMAOGDh0",
        mimeType: "image/jpg",
      },
      description: "Este es el primer post de VeoVeo",
      colorDay: {
        date: "2026-01-26T03:00:00.000Z",
        color: {
          id: 1,
          name: "blanco",
          value: "#FFFFFF",
        },
      },
      user: {
        id: 1,
        username: "esoxo",
        email: "esoxo@test.com",
      },
      createdAt: "2026-01-27T02:46:55.000Z",
    },
  ];
  return (
    <section className="feed-container">
      <span className="empty-header-placeholder" />
      {mockPosts.map((post) => (
        <FeedPost post={post} key={post.id} />
      ))}
      <span className="empty-footer-placeholder" />
    </section>
  );
}

export default FeedContainer;