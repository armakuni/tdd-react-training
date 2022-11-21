import { Given, When, Then, Before, BeforeAll, AfterAll, DataTable } from '@cucumber/cucumber'
import assert from 'assert'
import {
  fireEvent, render, screen, getByText
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import React from 'react';
import expect from 'expect'

import App from '../../src/ui/App'


const httpMock = new MockAdapter(axios);

BeforeAll(() => {
  httpMock.reset()
  render(<App />);
});

Given('the available toppings are:', function (dataTable: DataTable) {
  httpMock.onGet('http://localhost:5001/toppings').reply(200, dataTable.hashes());
})

Given('the available sauces are:', function (dataTable: DataTable) {
  httpMock.onGet('http://localhost:5001/sauces').reply(200, dataTable.hashes());
})

Given('the available sizes are:', function (dataTable: DataTable) {
  httpMock.onGet('http://localhost:5001/sizes').reply(200, dataTable.hashes());
})

Given('I have chosen the {string} sauce', function (name: string) {
    const selector = screen.getByText('Choose your sauce')
    const inputElement = selector?.querySelector(`input[value="${name}"]`) as HTMLElement
  
    inputElement.click()
})

When('I choose the {string} size', (size: string) => {
  const selector = screen.getByText('Choose your size')
  const inputElement = selector?.querySelector(`input[value="${size}"]`) as HTMLElement

  inputElement.click()
})

Then('the pizza order should read: {string}', (orderText: string) => {
  const element = screen.getByText('Your Order:').parentElement?.querySelector('.order');

  // expect(element?.textContent).toBe(orderText)
})