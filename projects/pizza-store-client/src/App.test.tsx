import {
  fireEvent, render, screen,
} from '@testing-library/react';
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

test('renders the pizza shop', async () => {
  httpMock
    .onGet('http://localhost:5001/sizes')
    .reply(200, ['large', 'small'])
    .onGet('http://localhost:5001/sauces')
    .reply(200, ['garlic', 'tomato'])
    .onGet('http://localhost:5001/toppings')
    .reply(200, toppings);

  render(<App />);

  expect(await screen.findByText('Build Your Order')).toBeVisible();
  expect(await screen.findByText('Select the size of your pizza')).toBeVisible();
  expect(await screen.findByText('large')).toBeVisible();
  expect(await screen.findByText('small')).toBeVisible();

  expect(await screen.findByText('Select the sauce for your pizza')).toBeVisible();
  expect(await screen.findByText('garlic')).toBeVisible();
  expect(await screen.findByText('tomato')).toBeVisible();

  expect(await screen.findByText('Choose your toppings')).toBeVisible();
  expect(await screen.findByText('pepperoni')).toBeVisible();
  expect(await screen.findByText('anchovy')).toBeVisible();
  expect(await screen.findByText('mushroom')).toBeVisible();

  fireEvent.click(screen.getByText('large'));
  fireEvent.click(screen.getByText('tomato'));
  fireEvent.click(screen.getByText('pepperoni'));
  fireEvent.click(screen.getByText('mushroom'));

  expect(screen.getByText('Your Order')).toBeVisible();
  expect(screen.getByText(/Price.*£19/)).toBeVisible();
});
