import axios from "axios";
import propertiesMock from '../data/properties.json';
import propertyMock from '../data/property.json';
import { convertToEuro } from './currency';
export const baseUrl= 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url, params = {}) => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    if (url.includes('/properties/list')) {
      const data = propertiesMock;
      data.hits = data.hits.map(property => {
        property.price = convertToEuro(property.price);
        return property;
      });
      return { data };
    }
    if (url.includes('/properties/detail')) {
      const { externalID } = params;
      const property = propertyMock.find(p => p.externalID === externalID);
      property.price = convertToEuro(property.price);
      return { data: property };
    }
  } else {
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        },
        params,
      });
      return { data };
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
        if (error.response.status === 429) {
          console.warn('Too many requests, wait before to try again.');
        }
      } else {
        console.error('Generic error:', error.message);
      }
      return null;
    }
  }
};


export const getProperties = async (num) => {
  const data = await fetchApi('/properties/list', {
    locationExternalIDs: '5002,6020',
    purpose: 'for-sale',
    hitsPerPage: num,
    page: '0',
    lang: 'en',
    sort: 'city-level-score',
  });
  return data?.data?.hits || [];
};

export const getProperty = async (id) => {
  const data = await fetchApi('/properties/detail', { externalID: id });
  return data?.data || {};
};

export const autoComplete = async (query) => {
  return fetchApi('/auto-complete', {
    query,
    hitsPerPage: 25,
    page: 0,
    lang: 'en',
  });
};