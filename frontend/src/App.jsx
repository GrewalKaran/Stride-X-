import { RouterProvider } from "react-router";
import { router } from "./app.route";
import { ClerkProvider } from "@clerk/clerk-react";
import RaceProvider from "./app.context.jsx"

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RaceProvider>
        <RouterProvider router={router} />
      </RaceProvider>
    </ClerkProvider>
  );
}

export default App;
