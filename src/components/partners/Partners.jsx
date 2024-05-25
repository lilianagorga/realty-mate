import React from 'react';
import { SimpleGrid, Image } from '@chakra-ui/react';
import { partners } from './partnersConst';

const Partners = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: partners.length }} margin='0 auto' minChildWidth='150px'>
      {partners.map((partner, index) => (
        <Image
          key={index}
          src={partner}
          alignSelf='center'
          padding={{ base: '2rem', sm: '3rem' }}
          filter='grayScale(1)'
          opacity='0.4'
        />
      ))}
    </SimpleGrid>
  );
};

export default Partners;