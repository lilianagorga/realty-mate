import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import theme from '../assets/js/theme';
import Price from '../components/price/Price.jsx';
import { mockPriceData } from '../mocks/mockPriceData';
import { getPrices } from '../utils/fetchData';

vi.mock('../utils/fetchData.js', () => ({
  getPrices: vi.fn(),
}));

describe('Price Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPrices).mockResolvedValue(mockPriceData);
  });
  
  test('renders the Price component with correct title and subtitle', async () => {
    await act(async () => {
      render(
        <ChakraProvider theme={theme}>
          <Price />
        </ChakraProvider>
      );
    });

    expect(screen.getByText(/Select Your Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose the perfect plan tailored to your needs./i)).toBeInTheDocument();
  });
});