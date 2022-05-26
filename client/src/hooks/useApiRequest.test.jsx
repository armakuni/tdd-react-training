import React, { useMemo } from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import useApiRequest from './useApiRequest';
import ConfigContext from '../ConfigContext';

function WithConfig({ config, children }) {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      { children }
    </ConfigContext.Provider>
  );
}

function TestComponent() {
  const response = useApiRequest('/sizes');

  switch (response.state) {
    case 'loading':
      return <>loading</>;
    case 'loaded':
      return <>{response.data.join(',')}</>;
    default:
      return (
        <>
          Error:
          {response.error}
        </>
      );
  }
}

describe('useApiRequest', () => {
  const config = { apiUrl: 'http://example.com' };
  const httpMock = new MockAdapter(axios);

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('initial state is loading', () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(() => new Promise((resolve) => { /* never resolve */
      }));

    render(<WithConfig config={config}><TestComponent /></WithConfig>);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('loads the data', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(200, ['a', 'b', 'c']);

    render(<WithConfig config={config}><TestComponent /></WithConfig>);

    expect(await screen.findByText('a,b,c')).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  it('reports an error response', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(500, 'there was an error');

    render(<WithConfig config={config}><TestComponent /></WithConfig>);

    expect(await screen.findByText(/Error:.*there was an error/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  it('rethrows unknown errors', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(() => { throw new Error('unknown'); });

    render(<WithConfig config={config}><TestComponent /></WithConfig>);

    expect(await screen.findByText(/Error:.*An unknown error occurred/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });
});
