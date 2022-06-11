import {
  fireEvent,
  render, RenderResult, screen,
} from '@testing-library/react';
import ToppingsSelector, { ToppingDetails, ToppingsFetcher } from './ToppingsSelector';

const toppings: ToppingDetails[] = [
  { id: 1, name: 'pepperoni' },
  { id: 2, name: 'anchovy' },
  { id: 3, name: 'mushroom' },
];

describe('ToppingsSelector', () => {
  let onUpdate: (selected: Set<number>) => void;
  let view: RenderResult;

  const fetchToppings: ToppingsFetcher = () => new Promise((resolve) => {
    resolve(toppings);
  });

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = render(
      <ToppingsSelector onUpdate={onUpdate} fetchToppings={fetchToppings} />,
    );
    await screen.findByText('pepperoni');
  });

  it('displays the title', () => {
    const titleElement = screen.getByText('Choose your toppings');
    expect(titleElement).toBeVisible();
  });

  it('displays the toppings', () => {
    expect(screen.getByText('pepperoni')).toBeVisible();
    expect(screen.getByText('anchovy')).toBeVisible();
  });

  it('sends back selection ids of peperoni and anchov on selection', () => {
    fireEvent.click(screen.getByLabelText('pepperoni'));
    fireEvent.click(screen.getByLabelText('anchovy'));
    expect(onUpdate).toHaveBeenCalledWith(new Set<number>([1, 2]));
  });

  it('sends back selection ids of peperoni on de-selection', () => {
    const pepperoniSelector = screen.getByLabelText('pepperoni');
    const anchovySelector = screen.getByLabelText('anchovy');
    fireEvent.click(pepperoniSelector);
    fireEvent.click(anchovySelector);
    fireEvent.click(pepperoniSelector);
    expect(onUpdate).toHaveBeenCalledTimes(4);
    expect(onUpdate).toHaveBeenNthCalledWith(4, new Set<number>([2]));
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });
});
