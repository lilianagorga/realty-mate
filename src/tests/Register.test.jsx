import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import Register from '../components/auth/Register';

vi.mock('axios');

describe('Register Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  it('renders registration form', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i, { selector: 'input[id="password"]' })).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('allows user to input name, email, password and password confirmation', () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[id="password"]' });
    const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password');
    expect(passwordConfirmationInput.value).toBe('password');
  });

  it('calls axios post on form submit', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[id="password"]' });
    const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/user/register'),
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        password_confirmation: 'password',
      }
    );
  });

  it('displays error message on registration failure', async () => {

    const originalError = console.error;
    console.error = vi.fn();

    axios.post.mockRejectedValueOnce(new Error('Registration failed'));

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input[id="password"]' });
    const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(registerButton);
    });

    await waitFor(() => expect(screen.getByText('Registration failed')).toBeInTheDocument());

    console.error = originalError;
  });
});