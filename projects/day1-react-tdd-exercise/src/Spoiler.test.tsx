import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import Spoiler from './Spoiler';

describe('<Spoiler />', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Spoiler title="Example title" content="Secret message" />);
  });

  describe('when content is hidden', () => {
    it('displays the title', () => {
      expect(screen.getByText('Example title')).toBeVisible();
    });

    it('does not display the content', () => {
      expect(screen.queryByText('Secret message')).not.toBeInTheDocument();
    });

    it('does not display the Hide button', () => {
      expect(screen.queryByText('Hide')).not.toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when content is shown', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText('Show'));
    });

    it('displays the content', () => {
      expect(screen.getByText('Secret message')).toBeVisible();
    });

    it('does not display the Show button', () => {
      expect(screen.queryByText('Show')).not.toBeInTheDocument();
    });

    it('hides the content when the Hide button is clicked', () => {
      fireEvent.click(screen.getByText('Hide'));
      expect(screen.queryByText('Secret message')).not.toBeInTheDocument();
    });

    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
