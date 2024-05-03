import React from 'react';
import { Box, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import propertiesData from '../../data/properties.json';
import PropertyCard from '../property/PropertyCard';

function Search() {
  const properties = propertiesData.hits;

  return (
    <Box backgroundColor='#f7f8f9' padding='3rem'>
      <Box maxWidth='1280px' margin='0 auto'>
        <SimpleGrid columns={{base: '1', sm: '3'}} gap={{base: '0', sm: '2rem'}}>
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

export default Search;