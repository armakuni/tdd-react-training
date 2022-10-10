import {
  fireEvent, render, RenderResult, screen, waitFor,
} from '@testing-library/react';
import ToppingsSelector, { ToppingsFetcher } from './ToppingsSelector';

describe('ToppingsSelector', () => {
  it('displays the title', async () => {
    const { container } = render(
      <ToppingsSelector
        fetchToppings={() => Promise.resolve([{ id: 'pepperoni', display: 'Pepperoni' }])}
        onUpdate={() => { /* do nothing */ }}
      />,
    );

    await waitFor(() => {
      const titleElement = container.querySelector('.multiple-choice__question');
      expect(titleElement?.textContent).toBe('Choose your toppings');

      const option1 = container.querySelector('label');
      expect(option1?.textContent).toBe('Pepperoni');
    });
  });
});
