import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ModalNotificaciones from "../components/ModalNotificaciones";

import './Home.css';

const Home = () => {
  return (
    <main className="home-container">
      <Header/>
      <ModalNotificaciones />
      <Footer currentPage={'home'} />
    </main>
  )
}

export default Home;