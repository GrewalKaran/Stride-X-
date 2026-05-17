import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { syncUser } from "../../auth/services/auth.api";

export const useSyncUser = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const handleSync = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      const token = await getToken();

      await syncUser(token, {
        username: user.username,
        email: user.primaryEmailAddress?.emailAddress,
      });
    };

    handleSync();
  }, [isLoaded, isSignedIn, user]);

  return {
    isLoaded,
    isSignedIn,
    user,
  };
};