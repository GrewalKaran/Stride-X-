import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const syncUser = async (token,userData) => {

  const res = await api.post(
    "/api/user/sync",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};