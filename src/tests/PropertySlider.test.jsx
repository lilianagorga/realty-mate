import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import PropertySlider from '../components/property/PropertySlider';
import propertiesDataMock from '../data/properties.json';
import theme from '../assets/js/theme';

vi.mock('../hooks/useIsDesktop.js', () => ({
  useIsDesktop: vi.fn(),
}));

import { useIsDesktop } from '../hooks/useIsDesktop.js';

describe('PropertySlider Component', () => {
  beforeEach(() => {
    useIsDesktop.mockReturnValue({ isDesktop: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with properties in desktop view', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <PropertySlider featuredProperties={propertiesDataMock.hits.slice(0, 5)} />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getAllByRole('img')).toHaveLength(5);

    propertiesDataMock.hits.slice(0, 5).forEach(property => {
      expect(screen.getByText(property.title)).toBeInTheDocument();
    });
  });

  it('renders the component with properties in mobile view', () => {
    useIsDesktop.mockReturnValue({ isDesktop: false });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <PropertySlider featuredProperties={propertiesDataMock.hits.slice(0, 5)} />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getAllByRole('img')).toHaveLength(5);

    propertiesDataMock.hits.slice(0, 5).forEach(property => {
      expect(screen.getByText(property.title)).toBeInTheDocument();
    });
  });

  it('renders no properties when FeaturedProperties is empty', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <PropertySlider featuredProperties={[]} />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});