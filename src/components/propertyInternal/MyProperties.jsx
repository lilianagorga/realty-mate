import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Box } from '@chakra-ui/react';

const MyProperties = () => {
  const { token } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data);
    } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [token]);

  return (
    <Box mt={10} p={10}>
      <h1>My properties</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>{property.title}: {property.price}</li>
        ))}
      </ul>
    </Box>
  );
};

export default MyProperties;