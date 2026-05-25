import React from "react";
import youImg from "../../../assets/maps-and-flags.png";
import opponentImg from "../../../assets/placeholder.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";
import RecenterMap from "./RecenterMap";
import "../styles/RaceMap.css";

const youIcon = L.icon({
  iconUrl: youImg,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const opponentIcon = L.icon({
  iconUrl: opponentImg,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
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

        <Marker position={position} icon={youIcon}>
          <Tooltip permanent direction="left" offset={[-18, 0]}>
            {youName}
          </Tooltip>
        </Marker>

        {opponentPosition && (
          <Marker position={opponentPosition} icon={opponentIcon}>
            <Tooltip permanent direction="right" offset={[18, 0]}>
              {opponentName}
            </Tooltip>
          </Marker>
        )}

        <Polyline positions={route.map((point) => [point.lat, point.lng])} />
      </MapContainer>
    </section>
  );
};

export default RaceMap;
