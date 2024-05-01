import React, { useState } from 'react';
import { Flex, Select, Box } from '@chakra-ui/react';
import { filterData } from '../utils/filterData';

function SearchFilter() {
  const [filters] = useState(filterData);

  const searchProperties = (filterValues) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.keys(filterValues).forEach((key) => {
      searchParams.set(key, filterValues[key]);
    });
    window.history.pushState({}, '', `?${searchParams.toString()}`);
  };

  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select placeholder={filter.placeholder} w="fit-content" p="2" onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}>
            {filter.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}

export default SearchFilter;