import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { io } from "socket.io-client";
import { useAuth, useUser } from "@clerk/clerk-react";

import { finishMultiplayerRace } from "../services/multiplayer.api";
import { useLocationTracker, useRaceTimer } from "../hooks/run.hook";

import RaceMap from "../components/RaceMap";
import RaceStats from "../components/RaceStats";
import "../styles/MultiplayerRace.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const TARGET_TIME = 60;

const MultiplayerRace = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const { position, route, distance, stopTracking } = useLocationTracker();
  const { seconds, stopTimer } = useRaceTimer();

  const [opponentPosition, setOpponentPosition] = useState(null);
  const [opponentDistance, setOpponentDistance] = useState(0);
  const [opponentSeconds, setOpponentSeconds] = useState(0);
  const [opponentName, setOpponentName] = useState("Opponent");

  const [raceFinished, setRaceFinished] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("opponent-location", (data) => {
      setOpponentPosition(data.position);
      setOpponentDistance(data.distance || 0);
      setOpponentSeconds(data.seconds || 0);
      setOpponentName(data.username || "Opponent");
    });

    return () => {
      socket.off("opponent-location");
    };
  }, [roomCode]);

  useEffect(() => {
    if (raceFinished) return;

    socket.emit("location-update", {
      roomCode,
      position,
      distance,
      seconds,
      username: user?.username || "Runner",
    });
  }, [roomCode, position, distance, seconds, raceFinished, user]);

  const finishRaceNow = async () => {
    if (raceFinished) return;

    stopTracking();
    stopTimer();
    setRaceFinished(true);

    let finalResult = "draw";

    if (distance > opponentDistance) finalResult = "win";
    if (distance < opponentDistance) finalResult = "lose";

    setResult(finalResult);

    const token = await getToken();

    await finishMultiplayerRace(token, roomCode, {
      distance,
      duration: seconds,
      route,
      result: finalResult,
      opponentDistance,
      opponentDuration: opponentSeconds,
    });
  };

  useEffect(() => {
    if (seconds >= TARGET_TIME && !raceFinished) {
      finishRaceNow();
    }
  }, [seconds, raceFinished]);

  const timeLeft = Math.max(TARGET_TIME - seconds, 0);

  return (
    <main className="multi-race-page">
      <header className="multi-race-header">
        <div>
          <h1>Multiplayer Race</h1>
          <p>Room: {roomCode}</p>
        </div>

        <div className="timer-pill">{timeLeft}s left</div>
      </header>

      {raceFinished && (
        <section className="result-card">
          <h2>
            {result === "win"
              ? "You won 🏆"
              : result === "lose"
                ? "Opponent won"
                : "Draw"}
          </h2>

          <button onClick={() => navigate("/", { replace: true })}>
            Go Home
          </button>
        </section>
      )}

      <section className="race-scoreboard">
        <div className="score-card you-score">
          <h3>{user?.username || "You"}</h3>
          <RaceStats distance={distance} seconds={seconds} />
        </div>

        <div className="score-card opponent-score">
          <h3>{opponentName}</h3>
          <p>{opponentDistance.toFixed(2)} KM</p>
          <p>{opponentSeconds}s</p>
        </div>
      </section>

      <RaceMap
        position={position}
        route={route}
        opponentPosition={opponentPosition}
        youName={user?.username || "You"}
        opponentName={opponentName}
      />

    </main>
  );
};

export default MultiplayerRace;
