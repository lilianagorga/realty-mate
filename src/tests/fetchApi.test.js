import { fetchApi, getProperties, getProperty, autoComplete } from '../utils/fetchApi';
import propertiesMock from '../data/properties.json';
import propertyMock from '../data/property.json';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('fetchApi', () => {
  beforeEach(() => {
    import.meta.env.VITE_USE_MOCK_DATA = 'true';
  });

  describe('fetchApi', () => {
    test('returns mock data for properties list', async () => {
      const data = await fetchApi('/properties/list');
      expect(data.data).toEqual(propertiesMock);
    });

    test('returns mock data for property detail', async () => {
      const externalID = propertyMock[0].externalID;
      const data = await fetchApi('/properties/detail', { externalID });
      expect(data.data).toEqual(propertyMock[0]);
    });

    test('fetches real data from API', async () => {
      import.meta.env.VITE_USE_MOCK_DATA = 'false';
      const mockResponse = { hits: [] };
      axios.get.mockResolvedValueOnce({ data: mockResponse });

      const data = await fetchApi('/properties/list');
      expect(data).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/properties/list', expect.any(Object));
    });

    test('handles API errors', async () => {
      import.meta.env.VITE_USE_MOCK_DATA = 'false';
      const errorResponse = {
        response: {
          status: 500,
          data: 'Server Error',
        },
      };
      axios.get.mockRejectedValueOnce(errorResponse);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const data = await fetchApi('/properties/list');
      expect(data).toBeNull();
      expect(console.error).toHaveBeenCalledWith('API Error:', 500, 'Server Error');
      consoleErrorSpy.mockRestore();
    });
  });
  

  describe('getProperties', () => {
    test('returns properties', async () => {
      const num = 10;
      const data = await getProperties(num);
      expect(data).toEqual(propertiesMock.hits);
    });
  });

  describe('getProperty', () => {
    test('returns property by ID', async () => {
      const externalID = propertyMock[0].externalID;
      const data = await getProperty(externalID);
      expect(data).toEqual(propertyMock[0]);
    });
  });

  describe('autoComplete', () => {
    test('returns autocomplete results', async () => {
      import.meta.env.VITE_USE_MOCK_DATA = 'false';
      const mockResponse = { hits: [] };
      axios.get.mockResolvedValueOnce({ data: mockResponse });

      const data = await autoComplete('query');
      expect(data).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith('https://bayut.p.rapidapi.com/auto-complete', expect.any(Object));
    });
  });
});