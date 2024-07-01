import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
import theme from '../assets/js/theme';
import Footer from '../components/common/footer/Footer';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '../setupTests';

describe('Footer', () => {
  test('renders all sections with correct links', async () => {
    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Our Services')).toBeInTheDocument();
    });

    ['Our Services', 'Meet The Team', 'Careers at Realty Mate', 'Latest News & Videos'].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
      expect(screen.getByText(item).closest('a')).toHaveAttribute('href', '/work-in-progress');
    });

    ['Buy', 'Rent', 'Commercial', 'Mortgage Services', 'Property Management'].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
      expect(screen.getByText(item).closest('a')).toHaveAttribute('href', '/work-in-progress');
    });

    ['Milan', 'London', 'Paris', 'Berlin', 'Barcelona'].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
      expect(screen.getByText(item).closest('a')).toHaveAttribute('href', '/work-in-progress');
    });

    ['Off-Plan', 'Holiday Homes', 'Home Maintenance', 'Sell with us', 'Let with us'].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
      expect(screen.getByText(item).closest('a')).toHaveAttribute('href', '/work-in-progress');
    });
  });


  test('renders contact section and button', () => {
    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText('Do You Have Questions ?')).toBeInTheDocument();

    const contactButton = screen.getByRole('button', { name: /contact us today/i });
    expect(contactButton).toBeInTheDocument();
  });

  test('renders footer branding', () => {
    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText('REALTY MATE')).toBeInTheDocument();
    expect(screen.getByText('All rights reserved - Copyright REALTY MATE')).toBeInTheDocument();
  });
});