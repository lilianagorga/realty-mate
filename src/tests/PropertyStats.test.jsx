import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import PropertyStats from '../components/property/PropertyStats';
import theme from '../assets/js/theme';
import propertyMock from '../data/property.json';
import { usePropertyFormat } from '../hooks/usePropertyFormat';

const mockPropertyFormatted = usePropertyFormat(propertyMock[0]);

describe('PropertyStats Component', () => {
  it('renders correctly with all properties', () => {
    const { rooms, baths, price, sqSize } = mockPropertyFormatted;

    render(
      <ChakraProvider theme={theme}>
        <PropertyStats rooms={rooms} baths={baths} price={price} sqSize={sqSize} />
      </ChakraProvider>
    );

    expect(screen.getByText('BEDS')).toBeInTheDocument();
    expect(screen.getByText('BATHS')).toBeInTheDocument();
    expect(screen.getByText('SIZE')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();

    expect(screen.getByTestId('beds')).toHaveTextContent(rooms.toString());
    expect(screen.getByTestId('baths')).toHaveTextContent(baths.toString());
    expect(screen.getByTestId('price')).toHaveTextContent(price);

    if (sqSize !== 'N/A') {
      expect(screen.getByTestId('size')).toHaveTextContent(sqSize.toString());
    }
  });

  it('renders correctly with zero values', () => {
    render(
      <ChakraProvider theme={theme}>
        <PropertyStats rooms={0} baths={0} price="$0" sqSize={0} />
      </ChakraProvider>
    );

    expect(screen.getByText('BEDS')).toBeInTheDocument();
    expect(screen.getByText('BATHS')).toBeInTheDocument();
    expect(screen.getByText('SIZE')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();

    expect(screen.getByTestId('beds')).toHaveTextContent('0');
    expect(screen.getByTestId('baths')).toHaveTextContent('0');
    expect(screen.getByTestId('size')).toHaveTextContent('0');
    expect(screen.getByTestId('price')).toHaveTextContent('$0');
  });

  it('renders correctly with undefined values', () => {
    render(
      <ChakraProvider theme={theme}>
        <PropertyStats rooms={undefined} baths={undefined} price={undefined} sqSize={undefined} />
      </ChakraProvider>
    );

    expect(screen.getByText('BEDS')).toBeInTheDocument();
    expect(screen.getByText('BATHS')).toBeInTheDocument();
    expect(screen.getByText('SIZE')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();

    expect(screen.getByTestId('beds')).toHaveTextContent('N/A');
    expect(screen.getByTestId('baths')).toHaveTextContent('N/A');
    expect(screen.getByTestId('size')).toHaveTextContent('N/A');
    expect(screen.getByTestId('price')).toHaveTextContent('N/A');
  });
});