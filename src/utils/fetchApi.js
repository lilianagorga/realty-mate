import axios from "axios"
export const baseUrl= 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  })
  return data;
}

export const getProperties = async (num) => {
  const data = await fetchApi('/properties/list', {
    locationExternalIDs: '5002,6020',
    purpose: 'for-sale',
    hitsPerPage: num,
    page: '0',
    lang: 'en',
    sort: 'city-level-score',
  });
  return data.hits;
};

export const getProperty = async (id) => {
  const data = await fetchApi('/properties/detail', { externalID: id });
  return data;
};