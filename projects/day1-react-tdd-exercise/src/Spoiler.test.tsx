import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import exp from 'constants';
import Spoiler from './Spoiler';

describe('<Spoiler />', () => {
  let view: RenderResult;

  beforeEach(() => {
    view = render(<Spoiler/>);
  });

  describe('Spoiler Component', () => {
    // it('displays the title passed in the prop', () => {
    //     expect(screen.getByRole('title')).toHaveTextContent('Example title');
    // });

    // it('shows the spoiler content when the "show" button is clicked', () => {
    //   fireEvent.click(screen.getByText('Show'));

    //   expect(screen.queryByRole('content')).toBeInTheDocument();
    //   expect(screen.getByRole('content')).toHaveTextContent('Test content');
    // });

    // it('does not display the passed content in the prop by default', () => {
    //   expect(screen.queryByRole('content')).not.toBeInTheDocument();
    // });

    // it('hides the spoiler content when the "hide" button is clicked', () => {
    //   // given show was already clicked
    //   fireEvent.click(screen.getByText('Show'));

    //   // when I "hide"
    //   fireEvent.click(screen.getByText('Hide'));

    //   expect(screen.queryByRole('content')).not.toBeInTheDocument();
    // });

    // it('matches the spoiler-showing snapshot', () => {
    //   expect(view).toMatchSnapshot();
    // })

    // it('matches the spoiler-showing snapshot', () => {
    //   fireEvent.click(screen.getByText('Show'));
    //   expect(view).toMatchSnapshot();
    // })
  });
});
