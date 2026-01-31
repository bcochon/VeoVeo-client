import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";

import './Explore.css';

const Explore = () => {
  return (
    <main className="explore-container">
      <div className="main-container"></div>
  
      <NotificationsModal />
      <Footer currentPage={"explore"} />
    </main>
  );
};

export default Explore;