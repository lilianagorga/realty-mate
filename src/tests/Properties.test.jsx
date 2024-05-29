import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Properties from '../components/pages/Properties';
import propertiesDataMock from '../data/properties.json';
import * as fetchApi from '../utils/fetchApi';
import theme from '../assets/js/theme';

vi.mock('../utils/fetchApi.js', () => ({
  getProperties: vi.fn(() => Promise.resolve(propertiesDataMock.hits))
}));

describe('Properties Component', () => {
  test('renders the list of properties', async () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Properties />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      const propertyCards = screen.getAllByRole('img');
      expect(propertyCards.length).toBe(propertiesDataMock.hits.length);
    });

    expect(screen.queryByText(/No Result Found/i)).not.toBeInTheDocument();
  });

  test('mock fetchApi.getProperties returns empty array', async () => {
    fetchApi.getProperties.mockResolvedValueOnce([]);
    
    const properties = await fetchApi.getProperties();
    
    expect(properties).toEqual([]);
  });

  test('renders "No Result Found" when there are no properties', async () => {
    fetchApi.getProperties.mockResolvedValueOnce([]);
    propertiesDataMock.hits = [];
  
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Properties />
        </BrowserRouter>
      </ChakraProvider>
    );
  
    await waitFor(() => {
      expect(fetchApi.getProperties).toHaveBeenCalled();
    });
  
    await waitFor(() => {
      const noResultMessage = screen.queryByText(/No Result Found\./i);
      expect(noResultMessage).toBeInTheDocument();
    });
  });
});