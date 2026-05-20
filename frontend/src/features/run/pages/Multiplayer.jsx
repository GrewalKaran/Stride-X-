import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMultiplayer } from "../hooks/multiplayer.hook";
import "../styles/Multiplayer.css";

const Multiplayer = () => {
  const navigate = useNavigate();
  const { loading, handleCreateRoom, handleJoinRoom } = useMultiplayer();

  const [roomCode, setRoomCode] = useState("");
  const [targetMinutes, setTargetMinutes] = useState(5);

  const handleCreate = async () => {
    const room = await handleCreateRoom({
      raceType: "time",
      targetTime: Number(targetMinutes) * 60,
      targetDistance: null,
    });

    if (!room) return;

    navigate(`/waiting-room/${room.roomCode}`);
  };

  const handleJoin = async () => {
    const room = await handleJoinRoom(roomCode.toUpperCase());

    if (!room) return;

    navigate(`/waiting-room/${room.roomCode}`);
  };

  if (loading) return <h1 className="page-loader">Loading...</h1>;

  return (
    <main className="multiplayer-page">
      <button
        className="back-btn"
        onClick={() => navigate("/", { replace: true })}
      >
        ← Home
      </button>

      <section className="multiplayer-card">
        <h1>Multiplayer Race</h1>
        <p className="muted-text">
          Create a timed race and compete for maximum distance.
        </p>

        <div className="form-section">
          <h2>Create Room</h2>

          <label>Race Time</label>
          <input
            type="number"
            min="1"
            value={targetMinutes}
            onChange={(e) => setTargetMinutes(e.target.value)}
            placeholder="Time in minutes"
          />

          <p className="muted-text">{targetMinutes} minutes race</p>

          <button className="primary-btn" onClick={handleCreate}>
            Create Room
          </button>
        </div>

        <div className="form-section">
          <h2>Join Room</h2>

          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
          />

          <button className="secondary-btn" onClick={handleJoin}>
            Join Room
          </button>
        </div>
      </section>
    </main>
  );
};

export default Multiplayer;
