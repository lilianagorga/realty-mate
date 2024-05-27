import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchProvider, useSearch } from '../context/SearchContext';

const TestComponent = () => {
  const { searchParams, updateSearchParams } = useSearch();

  return (
    <div>
      <p data-testid="search-params">{JSON.stringify(searchParams)}</p>
      <button onClick={() => updateSearchParams({ query: 'test' })}>Update Search</button>
    </div>
  );
};

describe('SearchContext', () => {
  test('provides initial search parameters', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    expect(screen.getByTestId('search-params')).toHaveTextContent('{}');
  });

  test('updates search parameters', async () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    screen.getByText('Update Search').click();
    
    await waitFor(() => {
      expect(screen.getByTestId('search-params')).toHaveTextContent('{"query":"test"}');
    });
  });
});