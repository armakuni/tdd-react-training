import { ReactElement } from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import useLoader from './useLoader';

type TestLoader = () => Promise<string>;

interface TestProps {
  loader: TestLoader;
}

function TestComponent({ loader }: TestProps): ReactElement {
  const result = useLoader(loader);

  switch (result.state) {
    case 'loading':
      return <div>loading</div>;
    case 'loaded':
      return (
        <div>
          result:
          {' '}
          { result.data }
        </div>
      );
    default:
      return (
        <div>
          error:
          {' '}
          { result.error }
        </div>
      );
  }
}

describe('useApiRequest', () => {
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
      .reply(() => new Promise(() => { /* never resolve */ }));

    const loader: TestLoader = () => new Promise(() => {
      /* never resolve */
    });

    render(<TestComponent loader={loader} />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('loads the data', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(200, ['a', 'b', 'c']);

    const loader: TestLoader = () => new Promise((resolve) => {
      resolve('example result');
    });

    render(<TestComponent loader={loader} />);

    expect(await screen.findByText(/example result/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  it('reports an error', async () => {
    httpMock.onGet('http://example.com/sizes')
      .reply(500, 'there was an error');

    const loader: TestLoader = () => new Promise((_resolve, reject) => {
      reject(new Error('there was an error'));
    });

    render(<TestComponent loader={loader} />);

    expect(await screen.findByText(/there was an error/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });
});
