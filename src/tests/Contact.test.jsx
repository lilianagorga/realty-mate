import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../components/pages/contact/Contact';
import theme from '../assets/js/theme';

describe('Contact Component', () => {
  test('renders Contact component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();

    expect(screen.getByText(/Laura Rossi/i)).toBeInTheDocument();
    expect(screen.getByText(/Public Relations Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Via Dante 12, 20121 Milano, Italia/i)).toBeInTheDocument();

    expect(screen.getByText(/Luca Bianchi/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Service Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Via Verdi 15, 20122 Milano, Italia/i)).toBeInTheDocument();
  });

  test('renders ContactForm component', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
    expect(screen.getByText(/I consent to having this website store my submitted information for future correspondence./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('renders TextContentBox components with correct titles', () => {
    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('For Inquiries Contact:')).toBeInTheDocument();
  });
});