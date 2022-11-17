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

test('renders the pizza shop', async () => {
  const sizes = [
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

  const sauces = [
    { id: 'garlic', display: 'Garlic Bread' },
    { id: 'tomato', display: 'Tomato' },
  ];

  const toppings =[
    { id: 'pepperoni', display: 'Pepperoni', price: 1 },
    { id: 'anchovy', display: 'Anchovies', price: 2.5 },
    { id: 'mushroom', display: 'Mushrooms', price: 3.0 },
  ];

  httpMock
    .onGet('http://localhost:5001/sizes')
    .reply(200, sizes)
    .onGet('http://localhost:5001/sauces')
    .reply(200, sauces)
    .onGet('http://localhost:5001/toppings')
    .reply(200, toppings);
  
  const App = require('../../src/ui/App.tsx');

  render(<App />);
});
