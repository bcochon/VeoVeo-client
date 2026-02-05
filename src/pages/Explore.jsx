import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NotificationsModal from "../components/modals/NotificationsModal";
import SearchBar from "../components/SearchBar";
import './Explore.css';
import useColorService from "../services/colorService";
import { Link } from "react-router-dom";
import { useColor } from "../context/ColorContext";

const Explore = () => {
  const { desaturate } = useColor();
  const { getColors } = useColorService();
  const [availableColors, setAvailableColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        console.log('Buscando colores...');
        setLoading(true);
        const colors = await getColors(0, 25);
        setAvailableColors(colors);
      } catch (err) {
        console.error('Error obteniendo colores:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="explore-container">
      <SearchBar />
      <section className="colors-container">
        {availableColors.map((color) => (
          <Link
            className="color-link"
            key={color?.id}
            style={{
              backgroundColor: desaturate(color?.value),
              boxShadow: `0 0 10px ${color?.value}`,
            }}
          />
        ))}
        {/* <Link
          className="color-link test-color"
        /> */}
      </section>
      <NotificationsModal />
      <Footer currentPage={"explore"} />
    </main>
  );
};

export default Explore;