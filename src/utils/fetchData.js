import axios from "axios";

const getHeaders = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`
    };
  }
  return {};
};

export const getTestimonials = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/testimonials`, {
    headers: getHeaders()
  });
  return response.data || [];
};

export const getTeams = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/teams`, {
    headers: getHeaders()
  });
  return response.data || [];
};

export const getPrices = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/prices`, {
    headers: getHeaders()
  });
  return response.data || [];
};