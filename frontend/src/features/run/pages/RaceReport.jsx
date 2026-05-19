// features/run/pages/RaceReport.jsx
import React from "react";
import { useParams } from "react-router";

const RaceReport = () => {
  const { raceId } = useParams();

  return (
    <div>
      <h1>Race Report</h1>
      <p>Race ID: {raceId}</p>
    </div>
  );
};

export default RaceReport;
