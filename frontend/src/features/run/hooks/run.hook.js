import { useAuth } from "@clerk/clerk-react"
import { allRaces as getAllRacesApi, finishRace, startRace } from "../services/run.api"
import { useEffect } from "react"
import { useContext } from "react"
import { RaceContext } from "../../../app.context.jsx"
import { useRef, useState } from "react";

export const useStartRace = () => {
    const {loading,setLoading,raceData, setRaceData} = useContext(RaceContext)
    const {getToken, isLoaded,isSignedIn} = useAuth()
         const handleStartRace = async()=>{
            if(!isLoaded || !isSignedIn) return
            try{
                setLoading(true)
                const token = await getToken()
                const data = await startRace(token)
                setRaceData(data.race)
                return data.race
            }
            finally{
                setLoading(false) 
            }
        }

    return {handleStartRace,loading,raceData}
}


export const useFinishRace = () => {
    const {loading,setLoading,finalRaceData, setFinalRaceData} = useContext(RaceContext)
    const {getToken, isLoaded,isSignedIn} = useAuth()
         const handleFinishRace = async(raceFinishData)=>{
            if(!isLoaded || !isSignedIn) return
            try{
                setLoading(true)
                const token = await getToken()
                const data = await finishRace(token,raceFinishData)
                setFinalRaceData(data.race)
                return data.race
            }
            finally{
                setLoading(false) 
            }
        }

    return {handleFinishRace,loading,finalRaceData}
}


export const useAllRaces = () => {
    const {loading,setLoading,allRaces, setAllRaces} = useContext(RaceContext)
    const {getToken, isLoaded,isSignedIn} = useAuth()
         const handleAllRaces = async()=>{
            if(!isLoaded || !isSignedIn) return
            try{
                setLoading(true)
                const token = await getToken()
                const data = await getAllRacesApi(token)
                setAllRaces(data.races)
                return data.races
            }
            finally{
                setLoading(false) 
            }
        }

    return {handleAllRaces,loading,allRaces}
}







export const useLocationTracker = () => {
  const [position, setPosition] = useState([28.6139, 77.209]);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);

  const watchIdRef = useRef(null);

  useEffect(() => {
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: new Date(),
        };

        setPosition([newPosition.lat, newPosition.lng]);

        setRoute((prev) => {
          if (prev.length > 0) {
            const lastPoint = prev[prev.length - 1];

            const addedDistance = calculateDistance(
              lastPoint.lat,
              lastPoint.lng,
              newPosition.lat,
              newPosition.lng
            );

            setDistance((prevDist) => prevDist + addedDistance);
          }

          return [...prev, newPosition];
        });
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  const stopTracking = () => {
    navigator.geolocation.clearWatch(watchIdRef.current);
  };

  return {
    position,
    route,
    distance,
    stopTracking,
  };
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



export const useRaceTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  return { seconds, stopTimer };
};


