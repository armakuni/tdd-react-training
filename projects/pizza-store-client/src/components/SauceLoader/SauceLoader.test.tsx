import { useMemo, ReactElement, ReactNode } from 'react';
import {
  render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import SauceLoader from './SauceLoader';
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

function renderSauceLoader(
  children: (sauces: string[]) => ReactElement,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <SauceLoader>
        {children}
      </SauceLoader>
    </WithConfig>,
  );
}

function mockChildren(sauces: string[]): ReactElement {
  return <>{sauces.map((size) => <span key={size}>{size}</span>)}</>;
}

describe('SauceLoader', () => {
  const httpMock = new MockAdapter(axios);

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('renders the children with the loaded sauces', async () => {
    httpMock.onGet('http://example.com/sauces')
      .reply(200, ['tomato', 'white']);

    renderSauceLoader(mockChildren);

    expect(await screen.findByText('tomato')).toBeInTheDocument();
    expect(await screen.findByText('white')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders an error message', async () => {
    httpMock.onGet('http://example.com/sauces')
      .reply(500, 'there was an error');

    renderSauceLoader(mockChildren);

    expect(await screen.findByText('there was an error')).toBeInTheDocument();
    expect(screen.queryByText('tomato')).not.toBeInTheDocument();
    expect(screen.queryByText('white')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders the loading message while waiting', async () => {
    httpMock.onGet('http://example.com/sauces')
      .reply(() => new Promise(() => { /* never resolve */ }));

    renderSauceLoader(mockChildren);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('tomato')).not.toBeInTheDocument();
    expect(screen.queryByText('white')).not.toBeInTheDocument();
  });
});
