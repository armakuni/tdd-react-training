import { Given, When, Then, Before, BeforeAll, AfterAll, DataTable } from '@cucumber/cucumber'
import {
  fireEvent, render, screen, getByText, RenderResult, waitFor, getByLabelText
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import App from '../../src/ui/App'
import expect from 'expect'


const httpMock = new MockAdapter(axios);
let renderComponent: () => RenderResult;

BeforeAll(() => {
  httpMock.reset()
  renderComponent = () => render(<App />);
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

Given('I have chosen the {string} sauce', async (sauce: string) => {
  const { getByText, getByLabelText } = renderComponent()

  await waitFor(() => {

    const inputElement = getByLabelText(sauce)
    expect(inputElement.getAttribute('value')).toBe(sauce)
  
    inputElement.click()
  });
})

When('I choose the {string} size', async (size: string) => {
  const { getByText, getByLabelText } = renderComponent()

  await waitFor(() => {

    const inputElement = getByLabelText(size)
    expect(inputElement.getAttribute('value')).toBe(size)
  
    inputElement.click()
  });

})

Then('the pizza order should read: {string}', (orderText: string) => {
  const element = screen.getAllByText('Your Order:');
  expect(element[0].nextElementSibling?.textContent).toContain(orderText)
})

Then('its price should be: £{int}', (price: number) => {
  const element = screen.getAllByText('Your Order:');
  expect(element[0].parentElement?.querySelector('.pizza-summary__price')?.textContent).toBe('£ ' + price)
})
