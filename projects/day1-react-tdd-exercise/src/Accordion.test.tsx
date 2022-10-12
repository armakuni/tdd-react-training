import {
    fireEvent, render, RenderResult, screen,
  } from '@testing-library/react';

import exp from 'constants';
import Accordion from './Accordion';

describe('<Accordion />', () => {
    let container: HTMLElement;
    let screen: RenderResult;

    beforeEach(() => {
        screen = render(<Accordion title="Accordion title" />);
        container = screen.container;
      });

  it('expands a section when you click on the title', () => {

    expect(container.querySelector('h2')?.textContent).toBe('Accordion title');
  });
});