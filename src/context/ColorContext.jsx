import { createContext, useEffect, useState, useContext } from 'react';
import { getTodayColor } from '../services/colorService';

const ColorContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [colorDay, setColorDay] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(null);
  const [loadingColor, setLoadingColor] = useState(false);

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  useEffect(() => {
    const load = async () => {
      setLoadingColor(true);
      getTodayColor()
        .then((data) => {
          setColorDay(data);
          const color = data?.color;
          console.log("Color del día:", color);
          setPrimaryColor(color);
          if (color?.value) {
            const rgb = hexToRgb(color?.value);
            const rgbString = `${rgb?.r} ${rgb?.g} ${rgb?.b}`;
            document.documentElement.style.setProperty(
              "--today-color-rgb",
              rgbString,
            );
          }
        })
        .catch(() => console.error("Error obteniendo el color del día"))
        .finally(() => setLoadingColor(false));
    }
    load();
  }, []);

  return (
    <ColorContext.Provider value={{ colorDay, primaryColor, loadingColor }}>
      {children}
    </ColorContext.Provider>
  );
}