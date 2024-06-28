import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Pricing from '../components/pages/Pricing';
import theme from '../assets/js/theme';
import { mockPriceData } from '../mocks/mockPriceData';
import { getPrices } from '../utils/fetchData';

vi.mock('../utils/fetchData.js', () => ({
  getPrices: vi.fn(),
}));

describe('Pricing Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPrices).mockResolvedValue(mockPriceData);
  });

  test('renders the Pricing component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Pricing />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/30 days money back guarantee/i)).toBeInTheDocument();
    expect(screen.getByText(/No Extra Fees. Friendly Support/i)).toBeInTheDocument();
  });

  test('renders the Banner component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Pricing />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/30 days money back guarantee/i)).toBeInTheDocument();
    expect(screen.getByText(/No Extra Fees. Friendly Support/i)).toBeInTheDocument();
    const bannerImage = screen.getByRole('img', { hidden: true });
    expect(bannerImage).toHaveAttribute('src', '/images/pricing.jpg');
  });

  test('renders the PriceCard component', async () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Pricing />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const priceCards = screen.getAllByRole('heading', { level: 3 });
      expect(priceCards.length).toBeGreaterThan(0);
    });
  });
});