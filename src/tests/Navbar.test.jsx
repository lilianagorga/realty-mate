import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../assets/js/theme';
import Navbar from '../components/common/Navbar';
import { describe, test, expect, beforeAll, vi, afterEach } from 'vitest';
import { AuthContext } from '../context/AuthContext';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: query === ('min-width: 768'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

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
  test('renders all buttons correctly on larger screens', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    renderWithRouter(
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ token: null, logout: vi.fn() }}>
          <Navbar />
        </AuthContext.Provider>
      </ChakraProvider>
    );

    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /properties/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('renders only menu button on smaller screens', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query !== '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
  
    renderWithRouter(
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ token: null, logout: vi.fn() }}>
          <Navbar />
        </AuthContext.Provider>
      </ChakraProvider>
    );
  
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /properties/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /contact/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /about/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /pricing/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    });
    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
    expect(screen.getByRole('menuitem', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /register/i })).toBeInTheDocument();
    });
  });

  test('navigates to correct routes when buttons are clicked on larger screens', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
    renderWithRouter(
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ token: null, logout: vi.fn() }}>
          <Navbar />
        </AuthContext.Provider>
        <LocationDisplay />
      </ChakraProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: /home/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    await userEvent.click(screen.getByRole('button', { name: /properties/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/properties');

    await userEvent.click(screen.getByRole('button', { name: /contact/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/contact');

    await userEvent.click(screen.getByRole('button', { name: /about/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/about');

    await userEvent.click(screen.getByRole('button', { name: /pricing/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/pricing');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/login');
    
    await userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/register');
  });

  test('navigates to correct routes when menu items are clicked on smaller screens', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query !== '(mix-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    renderWithRouter(
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ token: null, logout: vi.fn() }}>
          <Navbar />
        </AuthContext.Provider>
        <LocationDisplay />
      </ChakraProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /home/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /home/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /properties/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /properties/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/properties');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /contact/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/contact');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /about/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /about/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/about');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /pricing/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /pricing/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/pricing');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /login/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /login/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/login');

    await userEvent.click(screen.getByRole('button', { name: '' }));

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /register/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('menuitem', { name: /register/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/register');
  });

  test('renders and navigates auth-dependent buttons correctly', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    const mockLogout = vi.fn();

    renderWithRouter(
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ token: 'mockToken', logout: mockLogout }}>
          <Navbar />
          <LocationDisplay />
        </AuthContext.Provider>
      </ChakraProvider>
    );
    expect(screen.getByRole('button', { name: /my properties/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add property/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /my properties/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/myProperties');

    await userEvent.click(screen.getByRole('button', { name: /add property/i }));
    expect(screen.getByTestId('location-display')).toHaveTextContent('/addProperty');

    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});