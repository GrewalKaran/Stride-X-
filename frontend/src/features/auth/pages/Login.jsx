import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import "../style/auth.css";

export default function Login() {
   const { isSignedIn, isLoaded, } = useAuth();

   if (!isLoaded) return <h1>Loading...</h1>;


   if (isSignedIn) {
     return <Navigate to="/" replace />;
   }
  return (
    <main className="signup-page">
      <div className="signup-container">
        <SignIn forceRedirectUrl="/" signUpUrl="/register" />
      </div>
    </main>
  );
}
