import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const TextContentBox = ({ title, children }) => {
  return (
    <Box backgroundColor='white' borderRadius='lg' shadow='md' padding='1.5rem'>
      <Text fontSize='2xl' fontWeight='bold' marginBottom='1rem'>{title}</Text>
      {children}
    </Box>
  );
};

export default TextContentBox;
