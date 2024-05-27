import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../assets/js/theme';
import Navbar from '../components/common/Navbar';
import { describe, test, expect } from 'vitest';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname + location.search}</div>;
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};


describe('Navbar', () => {
  test('renders all buttons correctly', () => {
    renderWithRouter(
      <ChakraProvider theme={theme}>
        <Navbar />
      </ChakraProvider>
    );

    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pricing/i })).toBeInTheDocument();
  });

  test('navigates to correct routes when buttons are clicked', async () => {
    renderWithRouter(
      <ChakraProvider theme={theme}>
        <Navbar />
        <LocationDisplay />
      </ChakraProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /home/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/search');

    await userEvent.click(screen.getByRole('button', { name: /contact/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/contact');

    await userEvent.click(screen.getByRole('button', { name: /about/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/about');

    await userEvent.click(screen.getByRole('button', { name: /pricing/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/pricing');
  });

  test('opens menu and navigates to correct routes when menu items are clicked', async () => {
    renderWithRouter(
      <ChakraProvider theme={theme}>
        <Navbar />
        <LocationDisplay />
      </ChakraProvider>
    );

    const menuButton = screen.getByRole('button', { name: '' });
    await userEvent.click(menuButton);

    
    await screen.findByRole('menuitem', { name: /home/i });

    await userEvent.click(screen.getByRole('menuitem', { name: /home/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    await userEvent.click(screen.getByRole('menuitem', { name: /search/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/search');

    await userEvent.click(screen.getByRole('menuitem', { name: /about/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/about');

    await userEvent.click(screen.getByRole('menuitem', { name: /pricing/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/pricing');

    await userEvent.click(screen.getByRole('menuitem', { name: /buy property/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/search?purpose=for-sale');

    await userEvent.click(screen.getByRole('menuitem', { name: /rent property/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/search?purpose=for-rent');

    await userEvent.click(screen.getByRole('menuitem', { name: /contact/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/contact');
  });
});