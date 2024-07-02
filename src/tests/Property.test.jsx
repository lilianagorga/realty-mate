import React from 'react';
import { render, screen } from '@testing-library/react';
import Property from '../components/property/Property.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import propertyMock from '../data/property.json';
import { convertToEuro } from '../utils/currency.js';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: propertyMock[0].externalID }),
  };
});

vi.mock('../utils/fetchApi', () => ({
  getProperty: vi.fn(() => Promise.resolve(propertyMock[0])),
}));

vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

describe('Property Component', () => {
  test('renders property details correctly', async () => {
    render(
      <Router>
        <Property />
      </Router>
    );

    expect(await screen.findByText(/Residential, Apartments/i)).toBeInTheDocument();
    expect(await screen.findByText(/1-Bedroom \| Vacant \| Canal View/i)).toBeInTheDocument();
    expect(await screen.findByText(/UAE, Dubai, Business Bay, Mayfair Tower/i)).toBeInTheDocument();
    expect(await screen.findByText(/6679108/i)).toBeInTheDocument();
    expect(await screen.findByText(/for-sale/i)).toBeInTheDocument();

    const convertedPrice = convertToEuro(800000);
    const priceRegex = new RegExp(`${convertedPrice}`);
    expect(await screen.findByText(priceRegex)).toBeInTheDocument();

    expect(await screen.findByText(/1 Bedroom/i)).toBeInTheDocument();
    expect(await screen.findByText(/1 Bathroom/i)).toBeInTheDocument();
    expect(await screen.findByText(/Open Kitchen/i)).toBeInTheDocument();
    expect(await screen.findByText(/Built-in Wardrobes/i)).toBeInTheDocument();
    expect(await screen.findByText(/Laundry Room/i)).toBeInTheDocument();
    expect(await screen.findByText(/Balcony Canal View/i)).toBeInTheDocument();
    expect(await screen.findByText(/luxe homes is please to present you this 1-Bedroom Apartment in Business Bay, Mayfair Tower/i)).toBeInTheDocument();
    expect(await screen.findByText(/High-speed Elevators, CCTV and Fire-alarms/i)).toBeInTheDocument();
    expect(await screen.findByText(/Gym, Pool and Spa/i)).toBeInTheDocument();
    expect(await screen.findByText(/Children's Play Area/i)).toBeInTheDocument();

    const images = await screen.findAllByRole('presentation');
    expect(images.length).toBeGreaterThan(0);

    const coverImage = images.find(img => img.src === 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/319179042/3e120c40662d4f02b49c220db8d60f6d');
    expect(coverImage).toBeInTheDocument();
  });
});