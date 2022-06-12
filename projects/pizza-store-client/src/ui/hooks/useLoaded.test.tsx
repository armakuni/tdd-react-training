import { ReactElement } from 'react';
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

describe('useLoader', () => {
  it('initial state is loading', () => {
    const loader: TestLoader = () => new Promise(() => {
      /* never resolve */
    });

    render(<TestComponent loader={loader} />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('loads the data', async () => {
    const loader: TestLoader = () => Promise.resolve('example result');

    render(<TestComponent loader={loader} />);

    expect(await screen.findByText(/example result/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  it('reports an error', async () => {
    const loader: TestLoader = () => Promise.reject(new Error('there was an error'));

    render(<TestComponent loader={loader} />);

    expect(await screen.findByText(/there was an error/)).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });
});
