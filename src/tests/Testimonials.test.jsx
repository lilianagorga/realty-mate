import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import Testimonials from '../components/testimonials/Testimonials';
import { testimonials } from '../components/testimonials/testimonialConsts';

describe('Testimonials', () => {
  test('renders all testimonials', () => {
    render(
      <ChakraProvider theme={theme}>
        <Testimonials />
      </ChakraProvider>
    );

    testimonials.forEach((testimonial) => {
      const nameElement = screen.queryByText((content, element) => {
        return element.tagName.toLowerCase() === 'span' && content.includes(testimonial.name);
      });
      expect(nameElement).toBeInTheDocument();

      const companyElement = screen.queryByText((content, element) => {
        return element.tagName.toLowerCase() === 'p' && content.includes(testimonial.company);
      });
      expect(companyElement).toBeInTheDocument();

      const testimonialElement = screen.queryByText((content, element) => {
        return element.tagName.toLowerCase() === 'p' && content.includes(testimonial.testimonial);
      });
      expect(testimonialElement).toBeInTheDocument();
    });
  });
});