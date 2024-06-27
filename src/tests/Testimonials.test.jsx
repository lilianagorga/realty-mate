import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import theme from '../assets/js/theme';
import Testimonials from '../components/testimonials/Testimonials';
import { mockTestimonialsData } from '../constants/mockTestimonialsData';
import { getTestimonials } from '../utils/fetchData';

vi.mock('../utils/fetchData.js', () => ({
  getTestimonials: vi.fn(),
}));

describe('Testimonials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getTestimonials).mockResolvedValue(mockTestimonialsData);
  });

  test('renders all testimonials', async () => {
    render(
      <ChakraProvider theme={theme}>
        <Testimonials />
      </ChakraProvider>
    );

    await waitFor(() => {
      mockTestimonialsData.forEach((testimonial) => {
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
});