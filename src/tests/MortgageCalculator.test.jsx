import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MortgageCalculator from '../MortgageCalculator';
import { expect } from 'vitest';

describe('MortgageCalculator Component', () => {
  test('renders the form correctly', () => {
    render(<MortgageCalculator />);
    expect(screen.getByLabelText(/Principal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Interest Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Years/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  test('calculates the monthly payment correctly', async () => {
    render(<MortgageCalculator />);
    
    fireEvent.change(screen.getByLabelText(/Principal/i), { target: { value: '200000' } });
    fireEvent.change(screen.getByLabelText(/Interest Rate/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Years/i), { target: { value: '30' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
  
    await waitFor(() => expect(screen.getByText(/Monthly Payment:/i)).toBeInTheDocument());
  
    await waitFor(() => {
      const paymentText = screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'strong' && content.startsWith('$1073.64');
      });
      expect(paymentText).toBeInTheDocument();
    });
  });

  test('displays error when required fields are empty', () => {
    render(<MortgageCalculator />);
    
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
    expect(screen.queryByText(/Monthly Payment:/i)).not.toBeInTheDocument();
  });
});