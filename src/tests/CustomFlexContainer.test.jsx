import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CustomFlexContainer } from '../components/common/CustomFlexContainer';
import theme from '../assets/js/theme';

describe('CustomFlexContainer Component', () => {
  test('renders children correctly', () => {
    render(
      <ChakraProvider theme={theme}>
        <CustomFlexContainer>
          <div>Test Flex Content</div>
        </CustomFlexContainer>
      </ChakraProvider>
    );

    expect(screen.getByText('Test Flex Content')).toBeInTheDocument();
  });
});