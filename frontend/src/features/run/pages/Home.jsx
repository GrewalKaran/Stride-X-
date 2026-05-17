import React from "react";
import { Navigate } from "react-router";
import { useSyncUser } from "../../auth/hooks/auth.hook";

const Home = () => {
  const { isLoaded, isSignedIn } = useSyncUser();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
