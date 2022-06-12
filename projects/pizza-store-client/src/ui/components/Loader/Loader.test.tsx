import { ReactElement } from 'react';
import {
  render, RenderResult, screen,
} from '@testing-library/react';
import Loader, { LoadFunction } from './Loader';

function mockChildren(items: string[]): ReactElement {
  return <>{items.map((item) => <span key={item}>{item}</span>)}</>;
}

describe('Loader', () => {
  let view: RenderResult;

  describe('when loaded', () => {
    beforeEach(async () => {
      const loader: LoadFunction<string[]> = () => Promise.resolve(['big', 'small']);
      view = render(<Loader loader={loader}>{mockChildren}</Loader>);
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
      const loader: LoadFunction<string[]> = () => Promise.reject(new Error('there was an error'));
      view = render(<Loader loader={loader}>{mockChildren}</Loader>);
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
      view = render(<Loader loader={loader}>{mockChildren}</Loader>);
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
