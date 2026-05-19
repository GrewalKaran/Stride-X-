import React from "react";

const RaceStats = ({ distance, seconds }) => {
  return (
    <section className="race-stats">
      <div className="stat-card">
        <h2>{distance.toFixed(2)} KM</h2>
        <p>Distance</p>
      </div>

      <div className="stat-card">
        <h2>{seconds}s</h2>
        <p>Duration</p>
      </div>
    </section>
  );
};

export default RaceStats;
