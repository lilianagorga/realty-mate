import '@testing-library/jest-dom/vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockTeamData } from './mocks/mockData';

const mock = new MockAdapter(axios);

mock.onGet(`${import.meta.env.VITE_API_URL}/teams`).reply(200, mockTeamData);

import.meta.env.VITE_USE_MOCK_DATA = 'true';
import.meta.env.VITE_API_URL = 'http://localhost:8000/api';