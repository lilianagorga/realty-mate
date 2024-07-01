import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { TempCustomContainer as CustomContainer } from "../components/common/TempCustomContainer";
// import { CustomContainer } from '../components/common/CustomContainer';
import theme from '../assets/js/theme';

describe('CustomContainer Component', () => {
  test('renders children correctly', () => {
    render(
      <ChakraProvider theme={theme}>
        <CustomContainer>
          <div>Test Content</div>
        </CustomContainer>
      </ChakraProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});