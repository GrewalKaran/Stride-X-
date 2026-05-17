import { useAuth,SignUp } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import "../style/auth.css";

export default function Register() {
     const { isSignedIn, isLoaded } = useAuth();

     if (!isLoaded) return <h1>Loading...</h1>;

     if (isSignedIn) {
       return <Navigate to="/" replace />;
     }
  return (
    <main className="signup-page">
      <div className="signup-container">
        <SignUp forceRedirectUrl="/" signInUrl="/login" />
      </div>
    </main>
  );
}
