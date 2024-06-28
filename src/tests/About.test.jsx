import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/pages/About';
import theme from '../assets/js/theme';
import { mockPartnersData } from '../mocks/mockPartnersData';
import { mockTestimonialsData } from '../mocks/mockTestimonialsData';

vi.mock('../utils/fetchData.js', () => ({
  getPartners: () => Promise.resolve(mockPartnersData),
  getTestimonials: () => Promise.resolve(mockTestimonialsData),
}));

describe('About Component', () => {

  test('renders without crashing', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/About Us - Who We Are?/i)).toBeInTheDocument();
  });

  test('renders the Banner component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/About Us - Who We Are?/i)).toBeInTheDocument();
  });

  test('renders the Heading component with correct title and subtitle', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Our Agency Story/i)).toBeInTheDocument();
    expect(screen.getByText(/Check out our company story and work process/i)).toBeInTheDocument();
  });

  test('renders the paragraphs with correct text', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/At RealtyMate, we are committed to delivering exceptional real estate experiences./i)).toBeInTheDocument();
    expect(screen.getByText(/We pride ourselves on our extensive market knowledge and our ability to provide tailored advice/i)).toBeInTheDocument();
  });

  test('renders the "More About Us" button', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/More About Us/i)).toBeInTheDocument();
  });

  test('renders the image with correct background style', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );
  
    const imageBox = screen.getByTestId('about-image');
    expect(imageBox).toHaveStyle(`background: url('./immio.jpg') no-repeat center/cover`);
  });

  test('renders the Partners component', async () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const partnerImages = screen.getAllByRole('img');
      const partnerSrcs = partnerImages.map(image => {
        const src = image.src;
        const relativeSrc = src.replace(window.location.origin, '');
        return relativeSrc;
      });

      mockPartnersData.forEach(partner => {
        expect(partnerSrcs).toContain(partner.logo);
      });
    });
  });

  test('renders the Testimonials component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/Here's what our valued clients have to say/i)).toBeInTheDocument();
  });
});