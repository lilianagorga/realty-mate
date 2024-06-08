import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
          setToken(null);
          localStorage.removeItem('token');
        });
      }
    }, [token]);

    const login = async (email, password) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, { email, password });
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);
        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data);
        });
      } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Login failed');
        }
    };

    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };