import {
  fireEvent, render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import App from './App';
import { Size } from '../model/entities/Size';
import { Sauce } from '../model/entities/Sauce';
import { Topping } from '../model/entities/Topping';

const httpMock = new MockAdapter(axios);

afterEach(() => {
  httpMock.reset();
});

test('renders the pizza shop', async () => {
  const sizes: Size[] = [
    {
      id: 'large',
      display: 'Large',
      price: 15,
      toppingPriceMultiplier: 2,
    },
    {
      id: 'small',
      display: 'Small',
      price: 10,
      toppingPriceMultiplier: 1,
    },
  ];

  const sauces: Sauce[] = [
    { id: 'garlic', display: 'Garlic Bread' },
    { id: 'tomato', display: 'Tomato' },
  ];

  const toppings: Topping[] = [
    { id: 1, name: 'pepperoni', price: 1 },
    { id: 2, name: 'anchovy', price: 2.5 },
    { id: 3, name: 'mushroom', price: 3.0 },
  ];

  httpMock
    .onGet('http://localhost:5001/sizes')
    .reply(200, sizes)
    .onGet('http://localhost:5001/sauces')
    .reply(200, sauces)
    .onGet('http://localhost:5001/toppings')
    .reply(200, toppings);

  render(<App />);

  expect(await screen.findByRole('heading', { name: 'Build Your Order' })).toBeVisible();
  expect(await screen.findByText('Select the size of your pizza')).toBeVisible();
  expect(await screen.findByLabelText('large')).toBeVisible();
  expect(await screen.findByLabelText('small')).toBeVisible();

  expect(await screen.findByText('Select the sauce for your pizza')).toBeVisible();
  expect(await screen.findByLabelText('garlic')).toBeVisible();
  expect(await screen.findByLabelText('tomato')).toBeVisible();

  expect(await screen.findByText('Choose your toppings')).toBeVisible();
  expect(await screen.findByLabelText('pepperoni')).toBeVisible();
  expect(await screen.findByLabelText('anchovy')).toBeVisible();
  expect(await screen.findByLabelText('mushroom')).toBeVisible();

  fireEvent.click(screen.getByLabelText('large'));
  fireEvent.click(screen.getByLabelText('tomato'));
  fireEvent.click(screen.getByLabelText('pepperoni'));
  fireEvent.click(screen.getByLabelText('mushroom'));

  expect(screen.getByRole('heading', { name: 'Your Order' })).toBeVisible();
  expect(screen.getByText(/Price.*£19/)).toBeVisible();
});
