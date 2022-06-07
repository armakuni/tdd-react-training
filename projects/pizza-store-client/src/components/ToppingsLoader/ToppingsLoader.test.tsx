import { useMemo, ReactElement, ReactNode } from 'react';
import {
  render, screen,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ConfigContext from '../../ConfigContext';
import ToppingsLoader from './ToppingsLoader';
import Config from '../../Config';
import { Topping } from '../ToppingsSelector/ToppingsSelector';

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

function renderToppingsLoader(
  children: (toppings: Topping[]) => ReactElement,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <ToppingsLoader>
        {children}
      </ToppingsLoader>
    </WithConfig>,
  );
}

function mockChildren(toppings: Topping[]): ReactElement {
  return <>{toppings.map((topping) => <span key={topping.id}>{topping.name}</span>)}</>;
}

const toppings = [{ id: 1, name: 'pepperoni', price: 1 }, { id: 2, name: 'anchovy', price: 2.5 }, { id: 3, name: 'mushroom', price: 3.0 }];

describe('ToppingsLoader', () => {
  const httpMock = new MockAdapter(axios);

  afterEach(() => {
    httpMock.reset();
  });

  afterAll(() => {
    // is this necessary?
    httpMock.restore();
  });

  it('renders the children with the loaded toppings', async () => {
    httpMock.onGet('http://example.com/toppings')
      .reply(200, toppings);

    renderToppingsLoader(mockChildren);

    expect(await screen.findByText('pepperoni')).toBeInTheDocument();
    expect(await screen.findByText('anchovy')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders an error message', async () => {
    httpMock.onGet('http://example.com/toppings')
      .reply(500, 'there was an error');

      renderToppingsLoader(mockChildren);

    expect(await screen.findByText('there was an error')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders the loading message while waiting', async () => {
    httpMock.onGet('http://example.com/toppings')
      .reply(() => new Promise(() => { /* never resolve */ }));

      renderToppingsLoader(mockChildren);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('anchovy')).not.toBeInTheDocument();
    expect(screen.queryByText('pepperoni')).not.toBeInTheDocument();
  });
});
