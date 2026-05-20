import { useAuth } from "@clerk/clerk-react";
import { useContext } from "react";
import { RaceContext } from "../../../app.context";
import {
  createRoom,
  joinRoom,
  getRoom,
  startMultiplayerRace,
} from "../services/multiplayer.api";

export const useMultiplayer = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const { loading, setLoading, roomData, setRoomData } =
    useContext(RaceContext);

  const handleCreateRoom = async (roomSettings) => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);

      const token = await getToken();
      const data = await createRoom(token, roomSettings);

      setRoomData(data.room);
      return data.room;
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (roomCode) => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);

      const token = await getToken();
      const data = await joinRoom(token, roomCode);

      setRoomData(data.room);
      return data.room;
    } finally {
      setLoading(false);
    }
  };

  const handleGetRoom = async (roomCode) => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);

      const token = await getToken();
      const data = await getRoom(token, roomCode);

      setRoomData(data.room);
      return data.room;
    } finally {
      setLoading(false);
    }
  };

  const handleStartMultiplayerRace = async (roomCode) => {
    if (!isLoaded || !isSignedIn) return;

    try {
      setLoading(true);

      const token = await getToken();
      const data = await startMultiplayerRace(token, roomCode);

      setRoomData(data.room);
      return data.room;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    roomData,
    handleCreateRoom,
    handleJoinRoom,
    handleGetRoom,
    handleStartMultiplayerRace,
  };
};