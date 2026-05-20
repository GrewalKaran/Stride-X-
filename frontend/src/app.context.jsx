import { useState, createContext } from "react";

export const RaceContext = createContext();

const RaceProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  const [raceData, setRaceData] = useState({});

  const [finalRaceData, setFinalRaceData] = useState({});

  const [allRaces, setAllRaces] = useState([]);

  const [roomData, setRoomData] = useState(null);
  
  const [opponentPosition, setOpponentPosition] = useState(null);

  return (
    <RaceContext.Provider
      value={{
        loading,
        setLoading,
        raceData,
        setRaceData,
        finalRaceData,
        setFinalRaceData,
        allRaces,
        setAllRaces,
        roomData,
        setRoomData,
        opponentPosition,
        setOpponentPosition,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export default RaceProvider;