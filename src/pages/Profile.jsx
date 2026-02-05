import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import ProfileContainer from "../components/profile/ProfileContainer";
import './Profile.css';
import { useProfile } from "../context/ProfileContext";

const Profile = () => {
  const { profile } = useProfile();
  return (
    <main className="profile-container">
      <Header />
      <ProfileContainer userData={profile}/>
      <NotificationsModal />
      <Footer currentPage={"profile"} />
    </main>
  );
};

export default Profile;