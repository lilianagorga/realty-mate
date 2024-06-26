import axios from "axios";

export const getTeams = async () => {
  const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/teams`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  return response.data || [];
};

export const getPrices = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/prices`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return response.data || [];
};