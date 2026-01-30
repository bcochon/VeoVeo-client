import React from "react";
import Header from "../components/Header";
import AlertsGrid from "../components/AlertsGrid";
import AddAlertButton from "../components/AddAlertButton";
import ModalNotificaciones from "../components/ModalNotificaciones";

import './Home.css';

const Home = () => {
  return (
    <main className="home-container">
      <Header/>
      <AlertsGrid/>
      <footer className="main-footer add-alert-footer">
        <AddAlertButton />
      </footer>
      <ModalNotificaciones />
    </main>
  )
}

export default Home;