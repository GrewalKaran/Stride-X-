import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import youImg from "../../../assets/maps-and-flags.png";
import opponentImg from "../../../assets/placeholder.png";

import RecenterMap from "./RecenterMap";
import "../styles/RaceMap.css";

// Fix default Leaflet marker issue on deployment
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const youIcon = L.icon({
  iconUrl: youImg,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -20],
});

const opponentIcon = L.icon({
  iconUrl: opponentImg,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -20],
});

const RaceMap = ({
  position,
  route,
  opponentPosition,
  youName = "You",
  opponentName = "Opponent",
}) => {
  return (
    <section className="race-map">
      <MapContainer
        center={position}
        zoom={17}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <RecenterMap position={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* YOU */}
        <Marker position={position} icon={youIcon}>
          <Tooltip permanent direction="top" offset={[0, -20]}>
            {youName}
          </Tooltip>
        </Marker>

        {/* OPPONENT */}
        {opponentPosition && (
          <Marker position={opponentPosition} icon={opponentIcon}>
            <Tooltip permanent direction="top" offset={[0, -20]}>
              {opponentName}
            </Tooltip>
          </Marker>
        )}

        {/* ROUTE */}
        <Polyline positions={route.map((point) => [point.lat, point.lng])} />
      </MapContainer>
    </section>
  );
};

export default RaceMap;
