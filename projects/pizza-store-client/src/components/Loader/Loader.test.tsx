import { ReactElement } from 'react';
import {
  render, RenderResult, screen,
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
  let view: RenderResult;

  describe('when loaded', () => {
    beforeEach(async () => {
      const loader: LoadFunction<string[]> = () => new Promise((resolve) => {
        resolve(['big', 'small']);
      });
      view = renderSizeLoader(loader, mockChildren);
      await screen.findByText('big');
    });

    it('renders the children with the data', () => {
      expect(screen.getByText('big')).toBeVisible();
      expect(screen.getByText('small')).toBeVisible();
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      expect(view).toMatchSnapshot();
    });
  });

  describe('when an error occurred', () => {
    beforeEach(async () => {
      const loader: LoadFunction<string[]> = () => new Promise((_resolve, reject) => {
        reject(new Error('there was an error'));
      });
      view = renderSizeLoader(loader, mockChildren);
      await screen.findByText('there was an error');
    });

    it('renders an error message', () => {
      expect(screen.getByText('there was an error')).toBeVisible();
      expect(screen.queryByText('big')).not.toBeInTheDocument();
      expect(screen.queryByText('small')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      expect(view).toMatchSnapshot();
    });
  });

  describe('when loading', () => {
    beforeEach(async () => {
      const loader: LoadFunction<string[]> = () => new Promise(() => {
        /* never resolve */
      });
      view = renderSizeLoader(loader, mockChildren);
      await screen.findByTestId('loader');
    });

    it('renders the loading message', () => {
      expect(screen.getByTestId('loader')).toBeVisible();
      expect(screen.queryByText('big')).not.toBeInTheDocument();
      expect(screen.queryByText('small')).not.toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      expect(view).toMatchSnapshot();
    });
  });
});
