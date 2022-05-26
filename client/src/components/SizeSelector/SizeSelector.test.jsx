import React, { useMemo } from 'react';
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import SizeSelector from './SizeSelector';

function WithConfig({ config, children }) {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      { children }
    </ConfigContext.Provider>
  );
}

function renderSizeSelector(
  onUpdate,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <SizeSelector onUpdate={onUpdate || jest.fn()} />
    </WithConfig>,
  );
}

describe('SizeSelector', () => {
  const httpMock = new MockAdapter(axios);

  beforeEach(() => {
    httpMock.onGet('http://example.com/sizes').reply(200, ['big', 'small']);
  });

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('displays the title', async () => {
    renderSizeSelector();
    const titleElement = await screen.findByText('Select the size of your pizza');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the sizes', async () => {
    renderSizeSelector();
    const bigElement = await screen.findByText('big');
    const smallElement = await screen.findByText('small');

    expect(bigElement).toBeInTheDocument();
    expect(smallElement).toBeInTheDocument();
  });

  test('populated snapshot', async () => {
    const wrapper = renderSizeSelector();
    await screen.findByText('big');
    expect(wrapper).toMatchSnapshot();
  });

  it('only makes the request once', async () => {
    renderSizeSelector();
    await screen.findByText('big');
    // todo trigger a redraw
    expect(httpMock.history.get.length).toBe(1);
  });

  it('sends back selections on change', async () => {
    const onUpdate = jest.fn();
    renderSizeSelector(onUpdate);
    const bigSelector = await screen.findByLabelText('big');
    act(() => { fireEvent.click(bigSelector); });
    expect(onUpdate).toBeCalledWith('big');
  });
});
