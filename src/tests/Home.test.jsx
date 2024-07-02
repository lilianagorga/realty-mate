import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi, beforeEach, afterEach, afterAll } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Home';
import * as fetchApi from '../utils/fetchApi';
import propertiesDataMock from '../data/properties.json';
import theme from '../assets/js/theme';
import axios from 'axios';

let propertiesDataMockBackup;

axios.defaults.transformRequest = [(data) => data];
axios.defaults.transformResponse = [(data) => data];

vi.mock('../utils/fetchApi.js', () => ({
  getProperties: vi.fn(() => Promise.resolve(propertiesDataMock.hits))
}));

let mockGetPlace;
let mapInstance;
let autocompleteInstance;

beforeEach(() => {
  vi.resetAllMocks();
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  propertiesDataMockBackup = JSON.parse(JSON.stringify(propertiesDataMock));

  mockGetPlace = vi.fn();
  mapInstance = {
    setCenter: vi.fn(),
    setZoom: vi.fn(),
    addListener: vi.fn(),
    getStreetView: vi.fn(() => ({
      setPosition: vi.fn(),
      setVisible: vi.fn(),
      addListener: vi.fn(),
      setOptions: vi.fn(),
    })),
    setOptions: vi.fn(),
  };

  autocompleteInstance = {
    listeners: {},
    addListener(event, callback) {
      this.listeners[event] = callback;
    },
    triggerPlaceChanged() {
      if (this.listeners['place_changed']) {
        this.listeners['place_changed']();
      }
    },
    getPlace: mockGetPlace,
  };

  global.google = {
    maps: {
      Map: vi.fn(() => mapInstance),
      Marker: vi.fn(),
      StreetViewPanorama: vi.fn(() => ({
        setPosition: vi.fn(),
        setPov: vi.fn(),
        setVisible: vi.fn(),
        addListener: vi.fn(),
        setOptions: vi.fn(),
      })),
      StreetViewService: vi.fn(() => ({
        getPanorama: vi.fn((options, callback) => callback({ location: {}, links: [] }, 'OK')),
      })),
      places: {
        Autocomplete: vi.fn(() => autocompleteInstance),
        AutocompleteService: vi.fn(),
        PlacesServiceStatus: {
          OK: 'OK'
        }
      },
      StreetViewStatus: {
        OK: 'OK'
      },
      Geocoder: vi.fn(),
      marker: {
        AdvancedMarkerElement: vi.fn(),
      },
      event: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
        clearListeners: vi.fn(),
      }
    }
  };
});

afterEach(() => {
  propertiesDataMock.hits = JSON.parse(JSON.stringify(propertiesDataMockBackup.hits));
  vi.clearAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

describe('Home Component', () => {
  test('renders without crashing', async () => {
    const actualModule = await vi.importActual('@react-google-maps/api');
    vi.spyOn(actualModule, 'useJsApiLoader').mockReturnValue({ isLoaded: false });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => expect(screen.getByText(/Loading.../i)).toBeInTheDocument());
  });

  test('renders the list of properties', async () => {

    const actualModule = await vi.importActual('@react-google-maps/api');
    vi.spyOn(actualModule, 'useJsApiLoader').mockReturnValue({ isLoaded: true });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    propertiesDataMock.hits.slice(0, 5).forEach(property => {
      expect(screen.getByText(property.title)).toBeInTheDocument();
    });
  });

  test('updates map center on place selection', async () => {
    const actualModule = await vi.importActual('@react-google-maps/api');
    vi.spyOn(actualModule, 'useJsApiLoader').mockReturnValue({ isLoaded: true });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    const autocompleteInput = screen.getByPlaceholderText(/Explore your next home.../i);
    fireEvent.change(autocompleteInput, { target: { value: 'Rome' } });

    const mockPlace = {
      geometry: {
        location: {
          lat: () => 41.9028,
          lng: () => 12.4964,
        },
      },
    };
    mockGetPlace.mockReturnValue(mockPlace);
    await act(async () => {
      autocompleteInstance.triggerPlaceChanged();
    });
  
    await waitFor(() => {
      expect(mapInstance.setCenter).toHaveBeenCalledWith({
        lat: 41.9028,
        lng: 12.4964,
      });
    });
  });

  test('displays no properties message on fetch failure', async () => {
    fetchApi.getProperties.mockResolvedValueOnce([]);
    propertiesDataMock.hits = [];

    const actualModule = await vi.importActual('@react-google-maps/api');
    vi.spyOn(actualModule, 'useJsApiLoader').mockReturnValue({ isLoaded: true });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    await waitFor(() => expect(screen.queryByText(/No properties found/i)).toBeInTheDocument());
  });

  test('renders child components correctly', async () => {
    const actualModule = await vi.importActual('@react-google-maps/api');
    vi.spyOn(actualModule, 'useJsApiLoader').mockReturnValue({ isLoaded: true });

    render(
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ChakraProvider>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/Discover Our Featured Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Calculate Your Ideal Spending/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Featured Agents/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Your Package/i)).toBeInTheDocument();
  });
});