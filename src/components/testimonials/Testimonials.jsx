import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import TestimonialCard from './TestimonialCard.jsx';
import { getTestimonials } from '../../utils/fetchData.js';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Please log in to view testimonials.');
        } else {
          setError('Error fetching testimonials.');
        }
      }
    };
    fetchTestimonials();
  }, []);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box backgroundColor='blue.50' px={{ base: '0', sm: '1rem' }}>
      <Box maxWidth='1280px' margin='0 auto' paddingY={{ base: '3rem', sm: '6rem' }}>
        <Text fontSize={{ base: '4xl', sm: '5xl' }} lineHeight='shorter' fontWeight='light' textAlign='center' paddingX='2rem'>
          Testimonials
        </Text>
        <Text fontSize='2xl' marginTop='1rem' marginBottom='3rem' fontWeight='light' paddingX='2rem' textAlign='center'>
          Here's what our valued clients have to say
        </Text>
        <SimpleGrid columns='3' minChildWidth='300px' gap={{ base: '0.5rem', sm: '2.5rem' }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Testimonials;