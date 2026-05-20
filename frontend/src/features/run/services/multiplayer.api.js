import axios from "axios";

const api = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL,
});

export const createRoom = async (token, roomData) => {
  const res = await api.post("/api/multiplayer/create-room", roomData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const joinRoom = async (token, roomCode) => {
  const res = await api.post(
    "/api/multiplayer/join-room",
    { roomCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getRoom = async (token, roomCode) => {
  const res = await api.get(`/api/multiplayer/room/${roomCode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const startMultiplayerRace = async (token, roomCode) => {
  const res = await api.post(
    `/api/multiplayer/start-race/${roomCode}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const finishMultiplayerRace = async (token, roomCode, raceFinishData) => {
  const res = await api.patch(
    `/api/multiplayer/finish-race/${roomCode}`,
    raceFinishData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};