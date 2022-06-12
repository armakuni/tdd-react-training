import { render } from '@testing-library/react';
import ToppingsSelector from './ToppingsSelector';

describe('ToppingsSelector', () => {
  it('TODO', () => {
    render(
      <ToppingsSelector
        fetchToppings={() => Promise.resolve([])}
        onUpdate={() => { /* do nothing */ }}
      />,
    );
    // ...
  });
});
