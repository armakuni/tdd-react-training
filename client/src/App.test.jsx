import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const httpMock = new MockAdapter(axios);

afterEach(() => {
  httpMock.reset();
});

test('renders learn react link', async () => {
  httpMock.onGet('http://localhost:5001/sizes')
      .reply(200, ['big', 'small']);

  render(<App />);
  const sizeElement = await waitFor(() => screen.getByText(/Select the size of your pizza/i));
  expect(sizeElement).toBeInTheDocument();
});
