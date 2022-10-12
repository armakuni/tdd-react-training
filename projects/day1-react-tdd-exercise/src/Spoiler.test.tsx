import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import exp from 'constants';
import Spoiler from './Spoiler';

describe('<Spoiler />', () => {
  let container: HTMLElement;
  let screen: RenderResult;

  beforeEach(() => {
    screen = render(<Spoiler title="Example title" content="Secret message" />);
    container = screen.container;
  });

  it('always displays the text passed in the "title" prop', () => {
    expect(container.querySelector('h2')?.textContent).toBe('Example title');

    container = render(<Spoiler title="Different title" content="Secret message" />).container;
    expect(container.querySelector('h2')?.textContent).toBe('Different title');
  });

  it('has a "Show" button by default', () => {
    expect(container.querySelector('button')?.textContent).toBe('Show');
  });

  it('contains the spoiler content passed in the "content" prop', () => {
    container = render(<Spoiler title="Different title" content="Different secret message" />).container;
    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(container.querySelector('.spoiler__content')?.textContent).toBe('Different secret message')
  });

  it('should not show the spoiler content by default', () => {
    expect(screen.queryByText('Secret message')).not.toBeInTheDocument();
  });

  it('reveals the spoiler content is when the "Show" button is clicked', () => {
    fireEvent.click(container.getElementsByTagName('button')[0]);

    expect(screen.queryByText('Secret message')).toBeInTheDocument();
  });

  it('hides the spoiler content is when the "Hide" button is clicked', () => {
    
    const element = container.getElementsByTagName('button')[0];
    fireEvent.click(element);
    // given the spoiler is already showing
    expect(element.textContent).toBe('Hide');

    // when i click hide - 
    fireEvent.click(element);

    // then spoiler should be shown
    expect(screen.queryByText('Secret message')).not.toBeInTheDocument();
  });

});
