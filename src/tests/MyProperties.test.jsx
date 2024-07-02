import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from '../context/AuthContext';
import MyProperties from '../components/propertyInternal/MyProperties';

const mock = new MockAdapter(axios);

describe('MyProperties Component', () => {
  const token = 'valid-token';
  const properties = [
    { id: 1, title: 'Property 1', description: 'Description 1', price: '100000' },
    { id: 2, title: 'Property 2', description: 'Description 2', price: '200000' }
  ];

  beforeEach(() => {
    mock.reset();
  });

  it('renders the properties', async () => {
    mock.onGet(`${import.meta.env.VITE_API_URL}/properties`).reply(200, properties);

    await act(async () => {
      render(
        <AuthContext.Provider value={{ token }}>
          <Router>
            <MyProperties />
          </Router>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      properties.forEach(property => {
        expect(screen.getByText(property.title)).toBeInTheDocument();
        expect(screen.getByText(property.description)).toBeInTheDocument();
        expect(screen.getByText(`Price: €${property.price}`)).toBeInTheDocument();
      });
    });
  });

  it('handles API error', async () => {
    
    const originalError = console.error;
    console.error = vi.fn();

    mock.onGet(`${import.meta.env.VITE_API_URL}/properties`).reply(500);

    await act(async () => {
      render(
        <AuthContext.Provider value={{ token }}>
          <Router>
            <MyProperties />
          </Router>
        </AuthContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(properties[0].title)).not.toBeInTheDocument();
      expect(screen.queryByText(properties[1].title)).not.toBeInTheDocument();
    });

    console.error = originalError;
  });
});