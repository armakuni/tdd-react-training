import { Given, When, Then, Before, BeforeAll, AfterAll } from '@cucumber/cucumber'
import assert from 'assert'
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import React from 'react';

import App from '../../src/ui/App'

const httpMock = new MockAdapter(axios);

AfterAll(() => {
  httpMock.reset()
});

BeforeAll(() => {
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
 
  
  render(<App />);
});

Given('I have chosen the {string} sauce', function (name: string) {
    // Write code here that turns the phrase above into concrete actions
    screen.debug()
    assert.equal(1,1)
});

When('I choose the {string} size', (size: string) => {
  console.log(size)
  // Write code here that turns the phrase above into concrete actions
})
