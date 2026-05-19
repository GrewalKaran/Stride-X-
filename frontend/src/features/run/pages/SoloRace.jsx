import "../styles/SoloRace.css";
import "leaflet/dist/leaflet.css";

import React from "react";
import { useNavigate } from "react-router";

import {
  useFinishRace,
  useLocationTracker,
  useRaceTimer,
} from "../hooks/run.hook";

import RaceStats from "../components/RaceStats";
import RaceMap from "../components/RaceMap";

const SoloRace = () => {
  const navigate = useNavigate();

  const { handleFinishRace, loading } = useFinishRace();

  const { position, route, distance, stopTracking } = useLocationTracker();

  const { seconds, stopTimer } = useRaceTimer();

  const handleFinishRunButton = async () => {
    stopTracking();

    stopTimer();

    const res = await handleFinishRace({
      distance,
      duration: seconds,
      route,
    });

    if (!res) return;

    navigate(`/race-report/${res._id}`, {
      replace: true,
    });
  };

  if (loading) {
    return <h1>Finishing Race...</h1>;
  }

  return (
    <main className="solo-race-page">
      <RaceStats distance={distance} seconds={seconds} />

      <RaceMap position={position} route={route} />

      <section className="race-controls">
        <button className="finish-btn" onClick={handleFinishRunButton}>
          Finish Run
        </button>
      </section>
    </main>
  );
};

export default SoloRace;
