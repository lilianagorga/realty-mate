import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from '../context/AuthContext';
import AddMyProperty from '../components/propertyInternal/AddMyProperty';

const mock = new MockAdapter(axios);

describe('AddMyProperty Component', () => {
  const token = 'valid-token';

  beforeEach(() => {
    mock.reset();
    render(
      <AuthContext.Provider value={{ token }}>
        <Router>
          <AddMyProperty />
        </Router>
      </AuthContext.Provider>
    );
  });

  it('renders the form', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add property/i })).toBeInTheDocument();
  });

  it('allows user to input title, description, and price', () => {
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price/i);

    fireEvent.change(titleInput, { target: { value: 'Beautiful House' } });
    fireEvent.change(descriptionInput, { target: { value: 'A lovely 3 bedroom house.' } });
    fireEvent.change(priceInput, { target: { value: '300000' } });

    expect(titleInput.value).toBe('Beautiful House');
    expect(descriptionInput.value).toBe('A lovely 3 bedroom house.');
    expect(priceInput.value).toBe('300000');
  });

  it('submits the form successfully', async () => {
    mock.onPost(`${import.meta.env.VITE_API_URL}/properties`).reply(200, { message: 'Property added successfully!' });

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price/i);
    const addButton = screen.getByRole('button', { name: /add property/i });

    fireEvent.change(titleInput, { target: { value: 'Beautiful House' } });
    fireEvent.change(descriptionInput, { target: { value: 'A lovely 3 bedroom house.' } });
    fireEvent.change(priceInput, { target: { value: '300000' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => expect(screen.getByText('Property added successfully!')).toBeInTheDocument());

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(priceInput.value).toBe('');
  });

  it('displays an error message on form submission failure', async () => {
    const originalError = console.error;
    console.error = vi.fn();

    mock.onPost(`${import.meta.env.VITE_API_URL}/properties`).reply(500);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price/i);
    const addButton = screen.getByRole('button', { name: /add property/i });

    fireEvent.change(titleInput, { target: { value: 'Beautiful House' } });
    fireEvent.change(descriptionInput, { target: { value: 'A lovely 3 bedroom house.' } });
    fireEvent.change(priceInput, { target: { value: '300000' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('Property added successfully!')).not.toBeInTheDocument();
    });
    console.error = originalError;
  });
});