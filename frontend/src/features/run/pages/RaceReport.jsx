import React, { useContext, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { raceReport } from "../services/run.api";
import { useAuth } from "@clerk/clerk-react";

import { RaceContext } from "../../../app.context";
import RaceMap from "../components/RaceMap";

const RaceReport = () => {
  const { loading, setLoading, finalRaceData, setFinalRaceData } =
    useContext(RaceContext);

  const { raceId } = useParams();

  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchRaceReport = async () => {
      if (!isLoaded || !isSignedIn || !raceId) return;

      try {
        setLoading(true);

        const token = await getToken();

        const data = await raceReport(token, raceId);

        setFinalRaceData(data.race);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceReport();
  }, [isLoaded, isSignedIn, raceId]);

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/login" replace />;
  }

  if (loading || !isLoaded) {
    return <h1>Loading...</h1>;
  }

  const route = finalRaceData?.route || [];

  const position =
    route.length > 0 ? [route[0].lat, route[0].lng] : [28.6139, 77.209];

  return (
    <div>
      <h1>Race Report</h1>

      <p>Distance: {finalRaceData?.distance}</p>

      <p>Duration: {finalRaceData?.duration}</p>

      {route.length > 0 && <RaceMap position={position} route={route} />}
    </div>
  );
};

export default RaceReport;
