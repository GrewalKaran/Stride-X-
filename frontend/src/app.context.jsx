import { useState, createContext } from "react";

export const RaceContext = createContext();

const RaceProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  const [raceData, setRaceData] = useState({});

  const [finalRaceData, setFinalRaceData] = useState({});

  const [allRaces, setAllRaces] = useState([]);

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
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export default RaceProvider;