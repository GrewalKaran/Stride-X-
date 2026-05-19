import "../styles/Home.css";
import "leaflet/dist/leaflet.css";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useSyncUser } from "../../auth/hooks/auth.hook";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAllRaces, useStartRace } from "../hooks/run.hook";
import RecenterMap from "../components/RecenterMap";

const Home = () => {
  const { allRaces, handleAllRaces, isLoaded } = useAllRaces();
  const { isSignedIn,user } = useSyncUser();
  const {handleStartRace,loading} = useStartRace()
  const [position, setPosition] = useState([28.6139, 77.209]);

  const navigate = useNavigate()


  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    handleAllRaces();
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);


    const handleSoloRun = async () => {
      const data = await handleStartRace();
       if (!data) return;
      navigate("/solo-run", { replace: true });
    };

    const handleRaceReportHook = async (raceId) => {
      navigate(`/race-report/${raceId}`, {
        replace: true,
      });
    };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  const allraceComponent = allRaces.map((elem)=>{
    return (
      <div className="run-card" key={elem._id}>
        <h3>{elem.distance?.toFixed(2) || "0.00"} KM</h3>

        <p>{elem.duration} secs</p>

        <p>Status: {elem.status}</p>

        <button onClick={() => handleRaceReportHook(elem._id)}>
          View Report
        </button>
      </div>
    );
  })

  return (
    <main className="home-page">
      <section className="home-header">
        <h1>Hi, {user?.username || "Runner"} 👋</h1>

        <p>Ready for your next race?</p>
      </section>

      <section className="map-section">
        <MapContainer
          center={position}
          zoom={16}
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          <RecenterMap position={position}></RecenterMap>

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </section>

      <section className="action-buttons">
        <button className="solo-btn" onClick={handleSoloRun}>
          Start Solo Run
        </button>

        <button className="multi-btn">Multiplayer Race</button>
      </section>

      <section className="previous-runs">
        <h2>Previous Runs</h2>
        {allraceComponent}
      </section>
    </main>
  );
};

export default Home;
