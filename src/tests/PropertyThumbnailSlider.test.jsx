import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import PropertyThumbnailSlider from '../components/property/PropertyThumbnailSlider';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../assets/js/theme';

vi.mock('swiper/react', () => ({
  Swiper: ({ className, children }) => <div className={className}>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

describe('PropertyThumbnailSlider', () => {
  const photos = [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/photo3.jpg',
  ];

  test('renders all photos in the main slider', () => {
    render(
      <ChakraProvider theme={theme}>
        <PropertyThumbnailSlider photos={photos} />
      </ChakraProvider>
    );

    const mainSliderImages = document.querySelectorAll('.mySwiper2 img');
    expect(mainSliderImages).toHaveLength(photos.length);

    photos.forEach((photo, index) => {
      expect(mainSliderImages[index]).toHaveAttribute('src', photo);
    });
  });

  test('renders all photos in the thumbnail slider', () => {
    render(
      <ChakraProvider theme={theme}>
        <PropertyThumbnailSlider photos={photos} />
      </ChakraProvider>
    );

    const thumbnailSliderImages = document.querySelectorAll('.mySwiper img');
    expect(thumbnailSliderImages).toHaveLength(photos.length);

    photos.forEach((photo, index) => {
      expect(thumbnailSliderImages[index]).toHaveAttribute('src', photo);
    });
  });
});