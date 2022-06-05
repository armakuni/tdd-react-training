import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import App from './App';

const httpMock = new MockAdapter(axios);

afterEach(() => {
  httpMock.reset();
});

test('renders learn react link', async () => {
  httpMock.onGet('http://localhost:5001/sizes')
    .reply(200, ['large', 'small']);

  render(<App />);
  const sizeElement = await waitFor(() => screen.getByText(/Toppings/i));
  expect(sizeElement).toBeInTheDocument();
});
