import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const sizeElement = await waitFor(() => screen.getByText(/Select the size of your pizza/i));
  expect(sizeElement).toBeInTheDocument();
});
