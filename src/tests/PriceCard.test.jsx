import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import PriceCard from '../components/price/PriceCard';
import theme from '../assets/js/theme';
import { price } from '../constants/data';
import { expect } from 'vitest';
import { convertToEuro } from '../utils/currency';

describe('PriceCard Component', () => {
  test('renders the PriceCard component with correct plans', () => {
    render(
      <ChakraProvider theme={theme}>
        <PriceCard />
      </ChakraProvider>
    );

    price.forEach((item) => {
      expect(screen.getByText(item.plan)).toBeInTheDocument();
      const priceTextElements = screen.getAllByText(item.ptext);
      expect(priceTextElements.length).toBeGreaterThan(0);
      expect(priceTextElements.length).toBeLessThanOrEqual(price.length);
      const convertedPrice = convertToEuro(item.price).replace(/€/g, '');
      const priceRegex = new RegExp(`^€${convertedPrice}$`);
      
      const priceElement = screen.getByText(priceRegex);
      expect(priceElement).toBeInTheDocument();
    });
  });

  test('renders buttons with correct text', () => {
    render(
      <ChakraProvider theme={theme}>
        <PriceCard />
      </ChakraProvider>
    );

    price.forEach((item) => {
      expect(screen.getByRole('button', { name: `Start ${item.plan}` })).toBeInTheDocument();
    });
  });
});