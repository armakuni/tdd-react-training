import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import App from './App';

const httpMock = new MockAdapter(axios);

afterEach(() => {
  httpMock.reset();
});

const toppings = [
  { id: 1, name: 'pepperoni', price: 1 },
  { id: 2, name: 'anchovy', price: 2.5 },
  { id: 3, name: 'mushroom', price: 3.0 },
];

test('renders learn react link', async () => {
  httpMock
    .onGet('http://localhost:5001/sizes')
    .reply(200, ['large', 'small'])
    .onGet('http://localhost:5001/sauces')
    .reply(200, ['garlic', 'tomato'])
    .onGet('http://localhost:5001/toppings')
    .reply(200, toppings);

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Build Your Order')).toBeVisible();
    expect(screen.getByText('Select the size of your pizza')).toBeVisible();
    expect(screen.getByText('Select the sauce for your pizza')).toBeVisible();
    expect(screen.getByText('Choose your toppings')).toBeVisible();

    expect(screen.getByText('Your Order')).toBeVisible();
  });
});
