import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

import { raceReport } from "../services/run.api";
import { RaceContext } from "../../../app.context";
import RaceMap from "../components/RaceMap";
import "../styles/RaceReport.css";

const RaceReport = () => {
  const navigate = useNavigate();

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
    return <h1 className="page-loader">Loading report...</h1>;
  }

  const route = finalRaceData?.route || [];

  const position =
    route.length > 0 ? [route[0].lat, route[0].lng] : [28.6139, 77.209];

  const resultText =
    finalRaceData?.result === "win"
      ? "You won 🏆"
      : finalRaceData?.result === "lose"
        ? "Opponent won"
        : finalRaceData?.result === "draw"
          ? "Draw"
          : "Completed";

  return (
    <main className="report-page">
      <button
        className="back-btn"
        onClick={() => navigate("/", { replace: true })}
      >
        ← Home
      </button>

      <section className="report-card">
        <h1>Race Report</h1>

        <div className="report-badge">
          {finalRaceData?.mode === "multiplayer" ? "Multiplayer" : "Solo"}
        </div>

        {finalRaceData?.mode === "multiplayer" && (
          <h2 className="result-title">{resultText}</h2>
        )}

        <div className="report-grid">
          <div className="report-stat">
            <h3>{finalRaceData?.distance?.toFixed(2) || "0.00"} KM</h3>
            <p>Distance</p>
          </div>

          <div className="report-stat">
            <h3>{finalRaceData?.duration || 0}s</h3>
            <p>Duration</p>
          </div>

          {finalRaceData?.mode === "multiplayer" && (
            <>
              <div className="report-stat">
                <h3>
                  {finalRaceData?.opponentDistance?.toFixed(2) || "0.00"} KM
                </h3>
                <p>Opponent Distance</p>
              </div>

              <div className="report-stat">
                <h3>{finalRaceData?.opponentDuration || 0}s</h3>
                <p>Opponent Duration</p>
              </div>
            </>
          )}
        </div>
      </section>

      {route.length > 0 && (
        <RaceMap position={position} route={route} youName="Your route" />
      )}
    </main>
  );
};

export default RaceReport;
