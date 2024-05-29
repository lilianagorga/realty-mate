import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterEach } from 'vitest';
import PlacesAutocomplete from '../PlacesAutocomplete';

beforeAll(() => {
  global.google = {
    maps: {
      places: {
        Autocomplete: vi.fn(function (input, options) {
          this.input = input;
          this.options = options;
          this.listeners = {};
          this.addListener = vi.fn((event, handler) => {
            this.listeners[event] = handler;
          });
          this.getPlace = vi.fn(() => ({
            geometry: {
              location: {
                lat: 40.7128,
                lng: -74.0060,
              },
            },
          }));
          this.triggerPlaceChanged = () => {
            if (this.listeners['place_changed']) {
              this.listeners['place_changed']();
            }
          };
        }),
        AutocompleteService: vi.fn(),
        PlacesServiceStatus: {
          OK: 'OK'
        }
      }
    }
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('PlacesAutocomplete Component', () => {
  test('renders the input box', () => {
    render(<PlacesAutocomplete onPlaceSelected={vi.fn()} />);
    expect(screen.getByPlaceholderText('Explore your next home...')).toBeInTheDocument();
  });

  test('calls onPlaceSelected when a place is selected', async () => {
    const handlePlaceSelected = vi.fn();
    render(<PlacesAutocomplete onPlaceSelected={handlePlaceSelected} />);
  
    const autocompleteInput = screen.getByPlaceholderText('Explore your next home...');
    fireEvent.change(autocompleteInput, { target: { value: 'New York' } });
  
    global.google.maps.places.Autocomplete.mock.instances[0].triggerPlaceChanged();
  
    await waitFor(() => {
      expect(handlePlaceSelected).toHaveBeenCalledWith({
        geometry: {
          location: {
            lat: 40.7128,
            lng: -74.0060,
          },
        },
      });
    });
  });
});