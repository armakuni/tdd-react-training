import React, { useMemo } from 'react';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import ToppingsSelector from './ToppingsSelector';

const toppings = [{ id: 1, name: 'pepperoni' }, { id: 2, name: 'anchovy' }, { id: 3, name: 'mushroom' }];

function WithConfig({ config, children }) {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      { children }
    </ConfigContext.Provider>
  );
}

function renderToppingSelector(
  onUpdate,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <ToppingsSelector toppingOptions={toppings} onUpdate={onUpdate || jest.fn()} />
    </WithConfig>,
  );
}

describe('ToppingsSelector', () => {
  const httpMock = new MockAdapter(axios);

  beforeEach(() => {
    httpMock.onGet('http://example.com/toppings').reply(200, toppings);
  });

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('displays the title', async () => {
    renderToppingSelector();
    const titleElement = await screen.findByText('Toppings');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the toppings', async () => {
    renderToppingSelector();
    const pepperoniElement = await screen.findByText('pepperoni');
    const anchovyElement = await screen.findByText('anchovy');

    expect(pepperoniElement).toBeInTheDocument();
    expect(anchovyElement).toBeInTheDocument();
  });

  test('populated snapshot', async () => {
    const wrapper = renderToppingSelector();
    await screen.findByText('pepperoni');
    expect(wrapper).toMatchSnapshot();
  });

  // it('only makes the request once', async () => {
  //   renderToppingSelector();
  //   await screen.findByText('pepperoni');
  //   // todo trigger a redraw
  //   expect(httpMock.history.get.length).toBe(1);
  // });

  // it('sends back selections on change', async () => {
  //   const onUpdate = jest.fn();
  //   renderToppingSelector(onUpdate);
  //   const pepperoniSelector = await screen.findByLabelText('pepperoni');
  //   act(() => { fireEvent.click(pepperoniSelector); });
  //   expect(onUpdate).toBeCalledWith('pepperoni');
  // });
});
