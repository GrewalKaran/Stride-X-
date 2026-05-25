const youIconUrl = `${process.env.PUBLIC_URL}/maps-and-flags.png`;
const opponentIconUrl = `${process.env.PUBLIC_URL}/placeholder.png`;
import React from "react";
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

const youIcon = L.divIcon({
  className: "you-marker",
  html: "YOU",
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  iconUrl: youIconUrl,
});

const opponentIcon = L.divIcon({
  className: "opponent-marker",
  html: "OP",
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  iconUrl: opponentIconUrl,
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
