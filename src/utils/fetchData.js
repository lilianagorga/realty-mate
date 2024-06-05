import axios from "axios";

export const getTeams = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/teams`);
  return response.data || [];
};