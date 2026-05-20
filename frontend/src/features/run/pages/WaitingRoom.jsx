import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useMultiplayer } from "../hooks/multiplayer.hook";
import "../styles/Multiplayer.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const WaitingRoom = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const { roomData, handleGetRoom, handleStartMultiplayerRace } =
    useMultiplayer();

  useEffect(() => {
    socket.emit("join-room", roomCode);
  }, [roomCode]);

  useEffect(() => {
    socket.on("race-started", () => {
      navigate(`/multiplayer-race/${roomCode}`);
    });

    socket.on("room-ended", () => {
      navigate("/multiplayer", { replace: true });
    });

    return () => {
      socket.off("race-started");
      socket.off("room-ended");
    };
  }, [roomCode, navigate]);

  useEffect(() => {
    handleGetRoom(roomCode);

    const interval = setInterval(() => {
      handleGetRoom(roomCode);
    }, 2000);

    return () => clearInterval(interval);
  }, [roomCode]);

  const isHost = roomData?.hostClerkUserId === user?.id;

  const handleStart = async () => {
    const room = await handleStartMultiplayerRace(roomCode);

    if (!room) return;

    socket.emit("start-race", roomCode);
  };

  const handleBack = () => {
    if (isHost) {
      socket.emit("end-room", roomCode);
    }

    navigate("/multiplayer", { replace: true });
  };

  if (!roomData) return <h1 className="page-loader">Loading room...</h1>;

  const raceMinutes = Math.floor(roomData.targetTime / 60);

  return (
    <main className="multiplayer-page">
      <button className="back-btn" onClick={handleBack}>
        ← Previous
      </button>

      <section className="multiplayer-card">
        <h1>Waiting Room</h1>

        <div className="room-code-box">
          <p>Room Code</p>
          <h2>{roomData.roomCode}</h2>
        </div>

        <div className="race-info-box">
          <p>Race Type: Timed Race</p>
          <p>Race Time: {raceMinutes} minutes</p>
        </div>

        <h2>Players</h2>

        <div className="players-list">
          {roomData.players.map((player) => (
            <div className="player-card" key={player.clerkUserId}>
              <p>{player.username || "Runner"}</p>
            </div>
          ))}
        </div>

        {isHost ? (
          <button
            className="primary-btn"
            onClick={handleStart}
            disabled={roomData.players.length < 2}
          >
            Start Race
          </button>
        ) : (
          <p className="muted-text">Waiting for host to start...</p>
        )}
      </section>
    </main>
  );
};

export default WaitingRoom;
