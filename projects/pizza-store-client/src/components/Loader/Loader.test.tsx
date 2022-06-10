import { ReactElement } from 'react';
import {
  render, screen,
} from '@testing-library/react';
import Loader, { LoadFunction } from './Loader';
import { Size } from '../../model/Size';

function renderSizeLoader(
  loader: LoadFunction<string[]>,
  children: (results: string[]) => ReactElement,
) {
  return render(
    <Loader loader={loader}>
      {children}
    </Loader>,
  );
}

function mockChildren(sizes: Size[]): ReactElement {
  return <>{sizes.map((size) => <span key={size}>{size}</span>)}</>;
}

describe('Loader', () => {
  it('renders the children with the loaded sizes', async () => {
    const loader: LoadFunction<string[]> = () => new Promise((resolve) => {
      resolve(['big', 'small']);
    });

    renderSizeLoader(loader, mockChildren);

    expect(await screen.findByText('big')).toBeInTheDocument();
    expect(await screen.findByText('small')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders an error message', async () => {
    const loader: LoadFunction<string[]> = () => new Promise((_resolve, reject) => {
      reject(new Error('there was an error'));
    });

    renderSizeLoader(loader, mockChildren);

    expect(await screen.findByText('there was an error')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders the loading message while waiting', async () => {
    const loader: LoadFunction<string[]> = () => new Promise(() => {
      /* never resolve */
    });

    renderSizeLoader(loader, mockChildren);

    expect(await screen.findByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('big')).not.toBeInTheDocument();
    expect(screen.queryByText('small')).not.toBeInTheDocument();
  });
});
