import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Map from '../Map';
import '@testing-library/jest-dom';
import { vi, beforeAll, afterEach, expect } from 'vitest';

beforeAll(() => {
  const StreetViewPanorama = vi.fn().mockImplementation(function () {
    this.setPosition = vi.fn();
    this.getPosition = vi.fn().mockReturnValue({
      lat: () => 41.8719,
      lng: () => 12.5674,
      toJSON: () => ({ lat: 41.8719, lng: 12.5674 }),
    });
    this.getMap = vi.fn().mockReturnValue(true);
    this.setOptions = vi.fn();
    this.setVisible = vi.fn();
    this.listeners = {};
    this.addListener = vi.fn((event, handler) => {
      this.listeners[event] = handler;
    });
    this.trigger = (event) => {
      if (this.listeners[event]) {
        this.listeners[event]();
      }
    };
  });

  global.google = {
    maps: {
      Map: vi.fn().mockImplementation(function () {
        this.setCenter = vi.fn();
        this.setZoom = vi.fn();
        this.getStreetView = vi.fn().mockReturnValue(new StreetViewPanorama());
        this.addListener = vi.fn();
      }),
      Marker: class {},
      StreetViewPanorama,
      StreetViewService: class {
        getPanorama({ location, radius }, callback) {
          callback({}, 'OK');
        }
      },
      places: {
        Autocomplete: vi.fn(() => autocompleteInstance),
        AutocompleteService: vi.fn(),
        PlacesServiceStatus: {
          OK: 'OK'
        }
      },
      StreetViewStatus: {
        OK: 'OK',
      },
      marker: {
        AdvancedMarkerElement: class {
          constructor({ position, map }) {
            this.position = position;
            this.map = map;
          }
        },
      },
      event: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
        clearListeners: vi.fn(),
        trigger: (instance, event) => {
          if (instance.listeners && instance.listeners[event]) {
            instance.listeners[event]();
          }
        }
      },
    },
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('Map Component', () => {
  const defaultProps = {
    center: { lat: 41.8719, lng: 12.5674 },
    zoom: 6,
    onPositionChange: vi.fn(() => console.log('onPositionChange called')),
    isLoaded: true,
  };

  test('renders the Map component', () => {
    render(<Map {...defaultProps} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  test('renders with correct center and zoom', async () => {
    render(<Map {...defaultProps} />);
    await waitFor(() => {
      expect(global.google.maps.StreetViewPanorama).toHaveBeenCalled();
    });
  });

  test('calls onPositionChange when position changes', async () => {
    render(<Map {...defaultProps} />);
    
    const panoramaInstance = global.google.maps.StreetViewPanorama.mock.instances[0];

    panoramaInstance.getPosition.mockReturnValue({
      lat: () => 42.0,
      lng: () => 13.0,
      toJSON: () => ({ lat: 42.0, lng: 13.0 }),
    });

    await waitFor(() => {
      panoramaInstance.trigger('position_changed');
    });

    expect(defaultProps.onPositionChange).toHaveBeenCalledWith({ lat: 42.0, lng: 13.0 });
  });

  test('updates panorama position when center prop changes', async () => {
    const { rerender } = render(<Map {...defaultProps} />);
    const panoramaInstance = global.google.maps.StreetViewPanorama.mock.instances[0];
    const newCenter = { lat: 40.7128, lng: -74.0060 };

    rerender(<Map {...defaultProps} center={newCenter} />);
    await waitFor(() => {
      expect(panoramaInstance.setPosition).toHaveBeenCalledWith(newCenter);
    });
  });
});