import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import Heading from '../components/common/Heading';

describe('Heading', () => {
  test('renders title and subtitle correctly', () => {
    const title = 'Test Title';
    const subtitle = 'This is the subtitle';

    render(
      <ChakraProvider theme={theme}>
        <Heading title={title} subtitle={subtitle} />
      </ChakraProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  test('applies correct styles for aboutPage variant', () => {
    const title = 'About Title';
    const subtitle = 'About Subtitle';

    render(
      <ChakraProvider theme={theme}>
        <Heading title={title} subtitle={subtitle} variant="aboutPage" />
      </ChakraProvider>
    );

    const headingBox = screen.getByText(title).closest('div');

    expect(headingBox).toHaveStyle({
      textAlign: 'left',
      margin: '0',
    });
  });

  test('applies correct styles for default variant', () => {
    const title = 'Default Title';
    const subtitle = 'Default Subtitle';

    render(
      <ChakraProvider theme={theme}>
        <Heading title={title} subtitle={subtitle} />
      </ChakraProvider>
    );

    const headingBox = screen.getByText(title).closest('div');

    expect(headingBox).toHaveStyle({
      textAlign: 'center',
      margin: 'auto',
    });
  });
});