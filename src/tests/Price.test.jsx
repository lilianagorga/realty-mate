import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import Price from '../components/price/Price.jsx';

describe('Price Component', () => {
  test('renders the Price component with correct title and subtitle', () => {
    render(
      <ChakraProvider theme={theme}>
        <Price />
      </ChakraProvider>
    );

    expect(screen.getByText(/Select Your Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose the perfect plan tailored to your needs./i)).toBeInTheDocument();
  });
});