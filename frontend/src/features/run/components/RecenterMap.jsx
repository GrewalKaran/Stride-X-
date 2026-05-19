import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
};

export default RecenterMap;
