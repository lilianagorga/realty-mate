import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { vi, describe, it, beforeEach, afterEach } from 'vitest';
import FeaturedProperties from '../components/property/FeaturedProperties.jsx';
import propertiesDataMock from '../data/properties.json';
import theme from '../assets/js/theme';

let propertiesDataMockBackup;

beforeEach(() => {
  propertiesDataMockBackup = JSON.parse(JSON.stringify(propertiesDataMock));
});

afterEach(() => {
  propertiesDataMock.hits = JSON.parse(JSON.stringify(propertiesDataMockBackup.hits));
});

describe('FeaturedProperties Component', () => {
  it('renders the component with provided properties', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <FeaturedProperties featuredProperties={propertiesDataMock.hits.slice(0, 5)} />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Discover Our Featured Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/A Selection of our best properties/i)).toBeInTheDocument();

    propertiesDataMock.hits.slice(0, 5).forEach(property => {
      expect(screen.getByText(property.title)).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'p' && content.includes(property.price.toLocaleString());
      })).toBeInTheDocument();
    });
  });
});