import React, { useContext, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { raceReport } from "../services/run.api";
import { useAuth } from "@clerk/clerk-react";

import { RaceContext } from "../../../app.context";

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

  return (
    <div>
      <h1>Race Report</h1>

      <p>Distance: {finalRaceData?.distance}</p>

      <p>Duration: {finalRaceData?.duration}</p>
    </div>
  );
};

export default RaceReport;
