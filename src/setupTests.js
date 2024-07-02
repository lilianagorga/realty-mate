import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockTeamData } from './mocks/mockData';
import { mockFooterData } from './mocks/mockFooterData';

const mock = new MockAdapter(axios);

mock.onGet(`${import.meta.env.VITE_API_URL}/teams`).reply(200, mockTeamData);
mock.onGet(`${import.meta.env.VITE_API_URL}/footer-links`).reply(200, mockFooterData);
mock.onPost(`${import.meta.env.VITE_API_URL}/send-guide`).reply(200, { message: "Guide sent successfully" });

import.meta.env.VITE_USE_MOCK_DATA = 'true';
import.meta.env.VITE_API_URL = 'http://localhost:8000/api';
export default mock;