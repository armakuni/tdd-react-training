import {
  fireEvent,
  render, RenderResult, screen,
} from '@testing-library/react';
import ToppingsSelector, { ToppingDetails, ToppingsFetcher } from './ToppingsSelector';

const toppings: ToppingDetails[] = [
  { id: 'pepperoni', display: 'Pepperoni' },
  { id: 'anchovy', display: 'Anchovy' },
  { id: 'mushroom', display: 'Mushroom' },
];

describe('ToppingsSelector', () => {
  let onUpdate: (selected: Set<string>) => void;
  let view: RenderResult;

  const fetchToppings: ToppingsFetcher = () => Promise.resolve(toppings);

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = render(
      <ToppingsSelector onUpdate={onUpdate} fetchToppings={fetchToppings} />,
    );
    await screen.findByText('Pepperoni');
  });

  it('displays the title', () => {
    const titleElement = screen.getByText('Choose your toppings');
    expect(titleElement).toBeVisible();
  });

  it('displays the toppings', () => {
    expect(screen.getByText('Pepperoni')).toBeVisible();
    expect(screen.getByText('Anchovy')).toBeVisible();
  });

  it('sends back selection ids of peperoni and anchov on selection', () => {
    fireEvent.click(screen.getByLabelText('Pepperoni'));
    fireEvent.click(screen.getByLabelText('Anchovy'));
    expect(onUpdate).toHaveBeenCalledWith(new Set(['pepperoni', 'anchovy']));
  });

  it('sends back selection ids of peperoni on de-selection', () => {
    const pepperoniSelector = screen.getByLabelText('Pepperoni');
    const anchovySelector = screen.getByLabelText('Anchovy');
    fireEvent.click(pepperoniSelector);
    fireEvent.click(anchovySelector);
    fireEvent.click(pepperoniSelector);
    expect(onUpdate).toHaveBeenCalledTimes(4);
    expect(onUpdate).toHaveBeenNthCalledWith(4, new Set(['anchovy']));
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });
});
