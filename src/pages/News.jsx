import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";

import './News.css';

const News = () => {
  return (
    <main className="news-container">
      <Header />

      <div className="main-container"></div>
  
      <NotificationsModal />
      <Footer currentPage={"news"} />
    </main>
  );
};

export default News;