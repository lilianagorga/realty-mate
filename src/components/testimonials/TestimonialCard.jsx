import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { TbQuote } from 'react-icons/tb';

const TestimonialCard = ({ name, image, company, testimonial }) => {
  return (
    <Box backgroundColor='white' padding='3rem' display='flex' flexDirection='column'>
      <Box>
        <TbQuote size='40' color='#4299e1' />
      </Box>
      <Text fontSize='lg' color='gray.500' marginY='1.8rem'>{testimonial}</Text>
      <Flex gap='1rem' alignItems='center'>
        <Image src={image} width='6rem' height='6rem' borderRadius='full' objectFit='cover' />
        <Box>
          by <Text as='span'>{name}</Text>
          <Text fontSize='lg' fontStyle='italic' fontWeight='light' color='gray.600'>company - {company}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TestimonialCard;
