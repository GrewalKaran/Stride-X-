import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { syncUser } from "../../auth/services/auth.api";
import { useContext } from "react";
import { RaceContext } from "../../../app.context.jsx";

export const useSyncUser = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const {loading,setLoading} = useContext(RaceContext)
  const { user } = useUser();

  useEffect(() => {
    const handleSync = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try{
        setLoading(true)
        const token = await getToken();
        const data = await syncUser(token, {
        username: user.username,
        email: user.primaryEmailAddress?.emailAddress,
      });
        return data
      }
      finally{
        setLoading(false)
      }
    };

    handleSync();
  }, [isLoaded, isSignedIn, user]);

  return {
    loading,
    isLoaded,
    isSignedIn,
    user,
  };
};