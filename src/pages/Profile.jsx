import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import ProfileContainer from "../components/profile/ProfileContainer";
import { useAuth } from "../context/AuthContext";

import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  return (
    <main className="profile-container">
      <Header />
      <ProfileContainer userData={user}/>
      <NotificationsModal />
      <Footer currentPage={"profile"} />
    </main>
  );
};

export default Profile;