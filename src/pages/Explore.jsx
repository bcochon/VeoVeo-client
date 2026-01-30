import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalNotificaciones from "../components/ModalNotificaciones";

import './Explore.css';

const Explore = () => {
  return (
    <main className="explore-container">
      <div className="main-container"></div>
  
      <ModalNotificaciones />
      <Footer currentPage={"explore"} />
    </main>
  );
};

export default Explore;