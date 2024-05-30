import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
import theme from '../assets/js/theme';
import Footer from '../components/common/footer/Footer';
import { describe, test, expect } from 'vitest';
import { services, about, ourOffices, workWithUs } from '../components/common/footer/footerConsts';

describe('Footer', () => {
  test('renders all sections with correct links', () => {
    render(
      <ChakraProvider theme={theme}>
        <Footer />
      </ChakraProvider>
    );

    services.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.name).closest('a')).toHaveAttribute('href', item.link);
    });

    about.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.name).closest('a')).toHaveAttribute('href', item.link);
    });

    ourOffices.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.name).closest('a')).toHaveAttribute('href', item.link);
    });

    workWithUs.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.name).closest('a')).toHaveAttribute('href', item.link);
    });
  });

  test('renders contact section and button', () => {
    render(
      <ChakraProvider theme={theme}>
        <Footer />
      </ChakraProvider>
    );

    expect(screen.getByText('Do You Have Questions ?')).toBeInTheDocument();

    const contactButton = screen.getByRole('button', { name: /contact us today/i });
    expect(contactButton).toBeInTheDocument();
  });

  test('renders footer branding', () => {
    render(
      <ChakraProvider theme={theme}>
        <Footer />
      </ChakraProvider>
    );

    expect(screen.getByText('REALTY MATE')).toBeInTheDocument();
    expect(screen.getByText('All rights reserved - Copyright REALTY MATE')).toBeInTheDocument();
  });
});