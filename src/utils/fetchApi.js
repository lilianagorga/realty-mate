import axios from "axios"
export const baseUrl= 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url, params = {}) => {
  try {
    const { data } = await axios.get(`${baseUrl}${url}`, {
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
      },
      params,
    });
    console.log('API Response:', data); 
    return data;
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
  return data?.hits || [];
};

export const getProperty = async (id) => {
  const data = await fetchApi('/properties/detail', { externalID: id });
  return data || {};
};

export const autoComplete = async (query) => {
  return fetchApi('/auto-complete', {
    query,
    hitsPerPage: 25,
    page: 0,
    lang: 'en',
  });
};