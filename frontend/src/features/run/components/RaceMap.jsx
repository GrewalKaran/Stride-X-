import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const RaceMap = ({ position, route }) => {
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
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} />

        <Polyline positions={route.map((point) => [point.lat, point.lng])} />
      </MapContainer>
    </section>
  );
};

export default RaceMap;
