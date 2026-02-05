import { createContext, useEffect, useState, useContext } from 'react';
import useColorService from '../services/colorService';

const ColorContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [colorDay, setColorDay] = useState(null);
  const [primaryColor, setPrimaryColor] = useState(null);
  const [loadingColor, setLoadingColor] = useState(false);

  const { getTodayColor } = useColorService();

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // const r = Math.round(Math.random() * 255);
    // const g = Math.round(Math.random() * 255);
    // const b = Math.round(Math.random() * 255);
    // console.log(r, g, b)

    return { r, g, b };
  }

  function isLightColor({ r, g, b }) {
    return ( r + g + b ) > 450
      && ([r, g, b].filter((value) => value < 100).length < 2)
      && (Math.max(r, g, b) - Math.min(r, g, b)) < 40
  }

  function desaturate(hexValue) {
    const { r, g, b } = hexToRgb(hexValue);
    const valueToDesaturateHex = (v) =>
      Math.round(v * 0.8)
        .toString(16)
        .padStart(2, "0");
    const hexR = valueToDesaturateHex(r);
    const hexG = valueToDesaturateHex(g);
    const hexB = valueToDesaturateHex(b);
    return `#${hexR}${hexG}${hexB}`;
  }

  useEffect(() => {
    const load = async () => {
      setLoadingColor(true);
      getTodayColor()
        .then((data) => {
          setColorDay(data);
          const color = data?.color;
          // color.value = desaturate(color.value);
          console.log("Color del día:", color);
          setPrimaryColor(color);
          if (color?.value) {
            const rgb = hexToRgb(color?.value);
            const rgbString = `${rgb?.r} ${rgb?.g} ${rgb?.b}`;
            document.documentElement.style.setProperty(
              "--today-color-rgb",
              rgbString,
            );
            if (isLightColor(rgb))
              document.documentElement.style.setProperty(
                "--alternative-color-rgb",
                "223 243 70",
              );
          }
        })
        .catch(() => console.error("Error obteniendo el color del día"))
        .finally(() => setLoadingColor(false));
    }
    load();
  }, []);

  return (
    <ColorContext.Provider
      value={{ colorDay, primaryColor, loadingColor, desaturate }}
    >
      {children}
    </ColorContext.Provider>
  );
}