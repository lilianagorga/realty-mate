import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, test, expect } from 'vitest';
import theme from '../assets/js/theme';
import TextContentBox from '../components/common/TextContentBox';

describe('TextContentBox', () => {
  test('renders title and children correctly', () => {
    const title = 'Test Title';
    const content = 'This is the content of the TextContentBox';

    render(
      <ChakraProvider theme={theme}>
        <TextContentBox title={title}>
          <p>{content}</p>
        </TextContentBox>
      </ChakraProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('renders Divider component', () => {
    const title = 'Test Title';

    render(
      <ChakraProvider theme={theme}>
        <TextContentBox title={title}>
          <p>Content</p>
        </TextContentBox>
      </ChakraProvider>
    );

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });
});