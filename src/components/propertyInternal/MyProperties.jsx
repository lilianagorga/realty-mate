import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Box, Heading, SimpleGrid, Text, Card, CardBody } from '@chakra-ui/react';

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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={5}>
      <Box 
        maxW="1200px"
        width="100%"
        p={8}
        bg="rgba(255, 255, 255, 0.8)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        borderRadius="md"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          My Properties
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {properties.map(property => (
            <Card key={property.id}>
              <CardBody>
                <Heading as="h2" size="md" mb={4}>{property.title}</Heading>
                <Text>{property.description}</Text>
                <Text mt={4} fontWeight="bold">Price: €{property.price}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MyProperties;