import React from 'react';
import { Box, Flex, Text, Divider, Center } from '@chakra-ui/react';
import { TbBath, TbBed, TbRuler } from 'react-icons/tb';

const PropertyStats = ({ rooms = 'N/A', baths = 'N/A', price = 'N/A', sqSize = 'N/A' }) => {
  return (
    <Box backgroundColor='white' padding='1.5rem' marginBottom='1rem'>
      <Flex 
        flexDirection={{ base: 'column', sm: 'row' }}
        fontSize='xl'
        color='gray.500'
        fontWeight='light'
        gap='1rem'
        justifyContent='space-around'
        alignItems='center'
      >
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='0.3rem'>
          <Text>BEDS</Text>
          <Flex alignItems='center' gap='0.5rem' data-testid='beds'>
            <TbBed />
            {rooms}
          </Flex>
        </Flex>
        <Center height='50px'>
          <Divider orientation="vertical" />
        </Center>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='0.3rem'>
          <Text>BATHS</Text>
          <Flex alignItems='center' gap='0.5rem' data-testid='baths'>
            <TbBath />
            {baths}
          </Flex>
        </Flex>
        <Center height='50px'>
          <Divider orientation="vertical" />
        </Center>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='0.3rem'>
          <Text>SIZE</Text>
          <Flex alignItems='center' gap='0.5rem' data-testid='size'>
            <TbRuler />
            {sqSize}
          </Flex>
        </Flex>
        <Center height='50px'>
          <Divider orientation="vertical" />
        </Center>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' gap='0.3rem'>
          <Text>PRICE</Text>
          <Flex alignItems='center' gap='0.5rem' data-testid='price'>
            {price}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PropertyStats;
