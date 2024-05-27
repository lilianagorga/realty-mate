import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Banner from '../components/common/Banner';
import theme from '../assets/js/theme';

describe('Banner Component', () => {
  test('renders the Banner component with correct props', () => {
    render(
      <ChakraProvider theme={theme}>
        <Banner name="30 days money back guarantee" title="No Extra Fees. Friendly Support" cover="/images/pricing.jpg" />
      </ChakraProvider>
    );

    expect(screen.getByText(/30 days money back guarantee/i)).toBeInTheDocument();
    expect(screen.getByText(/No Extra Fees. Friendly Support/i)).toBeInTheDocument();
    const bannerImage = screen.getByRole('img', { hidden: true });
    expect(bannerImage).toHaveAttribute('src', '/images/pricing.jpg');
  });
});