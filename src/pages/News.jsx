import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalNotificaciones from "../components/ModalNotificaciones";

import './News.css';

const News = () => {
  return (
    <main className="news-container">
      <Header />

      <div className="main-container"></div>
  
      <ModalNotificaciones />
      <Footer currentPage={"news"} />
    </main>
  );
};

export default News;