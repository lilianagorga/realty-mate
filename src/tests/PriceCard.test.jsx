import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import PriceCard from '../components/price/PriceCard';
import theme from '../assets/js/theme';
import { expect } from 'vitest';
import { mockPriceData } from '../constants/mockPriceData';
import { convertToEuro } from '../utils/currency';

describe('PriceCard Component', () => {
  test('renders the PriceCard component with correct plans', async () => {
    render(
      <ChakraProvider theme={theme}>
        {mockPriceData.map((item, index) => (
          <PriceCard key={index} price={item} index={index} />
        ))}
      </ChakraProvider>
    );

    await waitFor(() => {
      mockPriceData.forEach((item) => {
        expect(screen.getByText(item.plan)).toBeInTheDocument();
        const priceTextElements = screen.getAllByText(item.ptext);
        expect(priceTextElements.length).toBeGreaterThan(0);
        expect(priceTextElements.length).toBeLessThanOrEqual(mockPriceData.length);
        const convertedPrice = convertToEuro(item.price);
        const priceRegex = new RegExp(`^${convertedPrice}$`);
        
        const priceElement = screen.getByText(priceRegex);
        expect(priceElement).toBeInTheDocument();
      });
    });
  });

  test('renders buttons with correct text', async () => {
    render(
      <ChakraProvider theme={theme}>
        {mockPriceData.map((item, index) => (
          <PriceCard key={index} price={item} index={index} />
        ))}
      </ChakraProvider>
    );

    await waitFor(() => {
      mockPriceData.forEach((item) => {
        expect(screen.getByRole('button', { name: `Start ${item.plan}` })).toBeInTheDocument();
      });
    });
  });

  test('renders features with correct icons and text', async () => {
    render(
      <ChakraProvider theme={theme}>
        {mockPriceData.map((item, index) => (
          <PriceCard key={index} price={item} index={index} />
        ))}
      </ChakraProvider>
    );

    await waitFor(() => {
      mockPriceData.forEach((item, priceIndex) => {
        item.features.forEach((feature, featureIndex) => {
          const featureListItem = screen.getByTestId(`feature-icon-${priceIndex}-${featureIndex}`).closest('li');
          const utils = within(featureListItem);
          
          expect(utils.getByTestId(`feature-icon-${priceIndex}-${featureIndex}`)).toBeInTheDocument();
          expect(utils.getByText(feature.text)).toBeInTheDocument();
        });
      });
    });
  });
});