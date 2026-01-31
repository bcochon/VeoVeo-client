import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import ProfileContainer from "../components/profile/ProfileContainer";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserData } from "../services/userService";
import "./Profile.css";

const UserPage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [userData, setUserData] = useState(undefined);
  const [selfView, setSelfView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try{
        setLoading(true);
        if (userId == user?.id) {
          setUserData(user);
          setSelfView(true);
        } else {
          const data = await getUserData(userId);
          setUserData(data);
        }
      } catch(err) {
        console.error(`Error obteniendo información del perfil:`, err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, user]);

  return (
    <main className="profile-container">
      <Header />
      { loading?
        <LoadingSpinner label="" />
        : <ProfileContainer userData={userData}/>
      }
      <NotificationsModal />
      <Footer currentPage={selfView? "profile" : "explore"} />
    </main>
  );
};

export default UserPage;