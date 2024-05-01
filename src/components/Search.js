import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import Property from './Property';
import SearchFilter from './SearchFilter';
import mockData from '../data/mockData.json';

const fetchData = async (query) => {
  const filteredProperties = mockData.hits.filter((property) => {
    let isValid = true;
    if (query.purpose && property.purpose !== query.purpose) {
      isValid = false;
    }
    return isValid;
  });

  return {
    properties: filteredProperties,
  };
};

function Search() {
  const purposeRef = useRef();
  const [properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(false);
  const [purpose, setPurpose] = useState('');

  const fetchProperties = useCallback(async (query) => {
    const data = await fetchData(query);
    setProperties(data.properties);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newPurpose = queryParams.get('purpose') || 'for-rent';
    if (newPurpose !== purposeRef.current) {
      setPurpose(newPurpose);
      fetchProperties({ purpose: newPurpose });
      purposeRef.current = newPurpose;
    }
  }, [fetchProperties]);

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilter />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {purpose}
      </Text>
      <Flex flexWrap='wrap'>
        {properties.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      {properties.length === 0 && (
        <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
          <img src="/images/noresult.svg" alt='no result' style={{ width: "10%", height: "auto" }} />
          <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
        </Flex>
      )}
    </Box>
  );
}

export default Search;