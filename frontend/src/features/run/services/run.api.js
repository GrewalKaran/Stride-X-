import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const startRace = async(token)=>{
    const res = await api.post('/api/race/start',{},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return res.data
}

export const finishRace = async(token,raceFinishData)=>{
    const res = await api.patch('/api/race/finish',{
        ...raceFinishData
    },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return res.data
}

export const allRaces = async(token)=>{
    const res = await api.get('/api/my-races',
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return res.data
}

export const raceReport = async(token,raceId)=>{
    const  res = await api.get(`/api/race-report/${raceId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    return res.data
}
