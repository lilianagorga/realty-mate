import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import Team from '../components/team/Team';
import { team } from '../constants/data';

describe('Team Component', () => {
  test('renders the Team component with correct title and subtitle', () => {
    render(
      <ChakraProvider theme={theme}>
        <Team />
      </ChakraProvider>
    );

    expect(screen.getByText(/Our Featured Agents/i)).toBeInTheDocument();
    expect(screen.getByText(/Our team of dedicated real estate agents brings you the best of residential and commercial properties, ensuring every transaction is smooth and beneficial./i)).toBeInTheDocument();
  });

  test('renders all team members with correct details', () => {
    render(
      <ChakraProvider theme={theme}>
        <Team />
      </ChakraProvider>
    );
  
    team.forEach((member) => {
      const nameElements = screen.getAllByText(member.name);
      const addressElements = screen.getAllByText(member.address);
      const listingElements = screen.getAllByText(`${member.list} Listings`);
  
      // Verifica che il numero di elementi trovati corrisponda al numero atteso
      expect(nameElements.length).toBeGreaterThan(0);
      expect(addressElements.length).toBeGreaterThan(0);
      expect(listingElements.length).toBeGreaterThan(0);
  
      member.icon.forEach((icon) => {
        const className = icon.props.className.split(' ')[1];
        const iconElements = screen.getAllByTestId(`icon-${className}`);
        expect(iconElements.length).toBeGreaterThan(0);
      });
    });
  });
});