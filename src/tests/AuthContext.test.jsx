import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { beforeEach, afterEach, afterAll, vi } from 'vitest';

const apiUrl = 'http://localhost:8000/api';
const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
const mockToken = 'testToken';

const renderWithAuthProvider = (ui) => {
  return render(
    <Router>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </Router>
  );
};

const TestComponent = () => {
  const { user, login, logout } = React.useContext(AuthContext);

  return (
    <div>
      {user ? <span>{user.name}</span> : <span>No User</span>}
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  
    mock.onPost(`${apiUrl}/user/login`).reply(200, { token: mockToken });
    mock.onGet(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${mockToken}` }
    }).reply(200, mockUser);
  });
  
  afterEach(() => {
    localStorage.clear();
    mock.resetHistory();
    vi.clearAllMocks();
  });
  
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should login successfully', async () => {
    renderWithAuthProvider(<TestComponent />);

    expect(screen.getByText(/no user/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  test('should logout successfully', async () => {
  
    localStorage.setItem('token', mockToken);

    renderWithAuthProvider(<TestComponent />);


    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/logout/i));

    await waitFor(() => {
      expect(screen.getByText(/no user/i)).toBeInTheDocument();
    });

    expect(localStorage.getItem('token')).toBeNull();
  });

  test('should handle login failure', async () => {
    const originalError = console.error;
    console.error = vi.fn();

    mock.onPost(`${apiUrl}/user/login`).reply(401, { message: 'Login failed' });

    renderWithAuthProvider(<TestComponent />);

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.getByText(/no user/i)).toBeInTheDocument();
    });

    expect(localStorage.getItem('token')).toBeNull();
    console.error = originalError;
  });
});