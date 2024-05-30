import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../assets/js/theme.js';
import { test, expect, beforeAll, vi } from 'vitest';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
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

test('applies Chakra UI theme', () => {
  render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toHaveStyle(`background-color: ${theme.colors.navbar[200]}`);
  expect(navbarElement).toHaveStyle(`border-color: ${theme.colors.navbar[100]}`);
});