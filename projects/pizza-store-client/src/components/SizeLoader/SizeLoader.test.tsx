import { ReactElement } from 'react';
import {
  render, screen,
} from '@testing-library/react';
import SizeLoader from './SizeLoader';
import { FetchSizes } from '../../model/SizeRepository';

function renderSizeLoader(
  fetchSizes: FetchSizes,
  children: (sizes: string[]) => ReactElement,
) {
  return render(
    <SizeLoader fetchSizes={fetchSizes}>
      {children}
    </SizeLoader>,
  );
}

function mockChildren(sizes: string[]): ReactElement {
  return <>{sizes.map((size) => <span key={size}>{size}</span>)}</>;
}

describe('SizeLoader', () => {
  it('renders the children with the loaded sizes', async () => {
    const fetchSizes: FetchSizes = () => new Promise((resolve) => {
      resolve(['big', 'small']);
    });

    renderSizeLoader(fetchSizes, mockChildren);

    expect(await screen.findByText('big')).toBeInTheDocument();
    expect(await screen.findByText('small')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders an error message', async () => {
    const fetchSizes: FetchSizes = () => new Promise((_resolve, reject) => {
      reject(new Error('there was an error'));
    });

    renderSizeLoader(fetchSizes, mockChildren);

    expect(await screen.findByText('there was an error')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders the loading message while waiting', async () => {
    const fetchSizes: FetchSizes = () => new Promise(() => {
      /* never resolve */
    });

    renderSizeLoader(fetchSizes, mockChildren);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
  });
});
