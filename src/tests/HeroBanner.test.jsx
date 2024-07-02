import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import HeroBanner from '../components/HeroBanner';

beforeAll(() => {
  vi.spyOn(window, 'alert').mockImplementation(() => {});
});

describe('HeroBanner', () => {
  test('renders HeroBanner with text and HeroForm', () => {
    render(
      <ChakraProvider theme={theme}>
        <HeroBanner />
      </ChakraProvider>
    );

    const heroBannerContainer = screen.getByRole('banner');

    const expectedText = "Download our new Property Buying Guide today...";
    const textNodes = [...heroBannerContainer.querySelectorAll('*')]
      .map(node => node.textContent)
      .filter(text => text.includes(expectedText));

    expect(textNodes.length).toBeGreaterThan(0);

    expect(screen.getByText(/A Free PDF with our best secrets for evaluating property purchase, calculating profit and so much more/i)).toBeInTheDocument();
    expect(screen.getByText(/Free PDF Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete the form below to download your guide/i)).toBeInTheDocument();
  });

  test('renders and submits the HeroForm with errors', async () => {
    render(
      <ChakraProvider theme={theme}>
        <HeroBanner />
      </ChakraProvider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const gdprCheckbox = screen.getByLabelText(/I consent to having this website store my submitted info/i);
    const submitButton = screen.getByRole('button', { name: /Download Now/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(gdprCheckbox).toBeInTheDocument();

    userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/required/i);
      expect(errorMessages).toHaveLength(4);
    });
  });

  test('renders and submits the HeroForm successfully', async () => {
    render(
      <ChakraProvider theme={theme}>
        <HeroBanner />
      </ChakraProvider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const gdprCheckbox = screen.getByLabelText(/I consent to having this website store my submitted info/i);
    const submitButton = screen.getByRole('button', { name: /Download Now/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(gdprCheckbox);

    fireEvent.click(submitButton);

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});