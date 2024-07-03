import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import { getProperties } from '../../utils/fetchApi.js';
import propertiesDataMock from '../../data/properties.json';
import PropertyCard from '../property/PropertyCard.jsx';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      if (import.meta.env.VITE_USE_MOCK_DATA === 'false') {
        try {
          const response = await getProperties(10);
          if (response.length > 0) {
            data = response;
          }
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      } else {
        data = propertiesDataMock.hits || [];
      }
      setProperties(data);
    };
    fetchData();
  }, []);

  return (
    <Box backgroundColor='brand.100' p={12} mt={10}>
      <Box maxWidth='1280px' margin='0 auto'>
        <SimpleGrid columns={{base: '1', lg: '3'}} gap={{base: '0', sm: '2rem'}}>
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </SimpleGrid>
        {properties.length === 0 && (
          <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <img src="/images/noresult.svg" alt='no result' style={{ width: "10%", height: "auto" }} />
            <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default Properties;