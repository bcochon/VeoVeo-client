import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import './ColorExplore.css';
import { useParams, Link } from "react-router-dom";
import { useColor } from "../context/ColorContext";
import usePostService from "../services/postService";
import PostsGrid from "../components/profile/PostsGrid";
import useColorService from "../services/colorService";

const ColorExploreContent = ({ colorId }) => {
  const { changeColor, desaturate } = useColor();
  const { getColorPosts } = usePostService();
  const { getColor } = useColorService();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [color, setColor] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("Buscando posts...");
        setLoading(true);
        const data = await getColorPosts(colorId, 0, 25);
        const fetchedPosts = data?.data || [];
        setPosts(fetchedPosts);
        const color = await getColor(colorId);
        setColor(color);
        changeColor(color?.value);
      } catch (err) {
        console.error("Error obteniendo posts:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [colorId]);

  function buildStyle() {
    const style = {
      color: desaturate(color?.value) || "white",
      textShadow: `0 0 3px ${color?.value}`,
    };
    if (color?.name === 'negro') style.textShadow = `0 0 10px white`;
    return style;
  }

  if (loading) return null;

  return (
    <>
      <h2 className="color-title" style={buildStyle()}>
        {color?.name?.toUpperCase()}
      </h2>
      {posts?.length > 0 ? (
        <div className="color-posts-container">
          <PostsGrid posts={posts} />
        </div>
      ) : (
        <>
          <p className="placeholder-message">
            Parece que todavía no hubo publicaciones de este color...
          </p>
          <Link className="back-button" to={"/explore"}>
            Volver
          </Link>
        </>
      )}
    </>
  );
}

const ColorExplore = () => {
  const { colorId } = useParams();
  const { returnColor } = useColor();

  useEffect(() => {
    return () => {
      returnColor();
    };
  }, []);

  return (
    <main className="color-container">
      <Header />
      <ColorExploreContent colorId={colorId} />
      <NotificationsModal />
      <Footer currentPage={"explore"} />
    </main>
  );
};

export default ColorExplore;