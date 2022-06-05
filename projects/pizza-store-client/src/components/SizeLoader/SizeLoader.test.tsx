import React, { useMemo, ReactElement, ReactNode } from 'react';
import {
  render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import SizeLoader from './SizeLoader';
import Config from '../../Config';

interface WithConfigProps {
  config: Config;
  children: ReactNode;
}

function WithConfig({
  config,
  children,
}: WithConfigProps) {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      {children}
    </ConfigContext.Provider>
  );
}

function renderSizeLoader(
  children: (sizes: string[]) => ReactElement,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <SizeLoader>
        {children}
      </SizeLoader>
    </WithConfig>,
  );
}

function mockChildren(sizes: string[]): ReactElement {
  return <>{sizes.map((size) => <span key={size}>{size}</span>)}</>;
}

describe('SizeLoader', () => {
  const httpMock = new MockAdapter(axios);

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('renders the children with the loaded sizes', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(200, ['big', 'small']);

    renderSizeLoader(mockChildren);

    expect(await screen.findByText('big')).toBeInTheDocument();
    expect(await screen.findByText('small')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders an error message', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(500, 'there was an error');

    renderSizeLoader(mockChildren);

    expect(await screen.findByText('there was an error')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders the loading message while waiting', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(() => new Promise(() => { /* never resolve */ }));

    renderSizeLoader(mockChildren);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
  });
});
