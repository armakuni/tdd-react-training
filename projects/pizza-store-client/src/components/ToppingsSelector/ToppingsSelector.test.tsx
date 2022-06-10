import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import ToppingsSelector from './ToppingsSelector';
import { FetchToppings } from '../../model/ToppingRepository';
import { Topping } from '../../model/Topping';

const toppings: Topping[] = [
  { id: 1, name: 'pepperoni', price: 1 },
  { id: 2, name: 'anchovy', price: 2.5 },
  { id: 3, name: 'mushroom', price: 3.0 },
];

function renderToppingSelector(
  onUpdate: undefined | jest.Mock = undefined,
) {
  const fetchToppings: FetchToppings = () => new Promise((resolve) => {
    resolve(toppings);
  });

  return render(
    <ToppingsSelector onUpdate={onUpdate || jest.fn()} fetchToppings={fetchToppings} />,
  );
}

describe('ToppingsSelector', () => {
  it('displays the title', async () => {
    renderToppingSelector();
    const titleElement = await screen.findByText('Choose your toppings');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the toppings', async () => {
    renderToppingSelector();
    const pepperoniElement = await screen.findByText('pepperoni');
    const anchovyElement = await screen.findByText('anchovy');

    expect(pepperoniElement).toBeInTheDocument();
    expect(anchovyElement).toBeInTheDocument();
  });

  it('sends back selection ids of peperoni and anchov on selection', async () => {
    const onUpdateMock = jest.fn();
    renderToppingSelector(onUpdateMock);
    const pepperoniSelector = await screen.findByLabelText('pepperoni');
    const anchovySelector = await screen.findByLabelText('anchovy');
    fireEvent.click(pepperoniSelector);
    fireEvent.click(anchovySelector);
    expect(onUpdateMock).toHaveBeenCalledWith(new Set<number>([1, 2]));
  });

  it('sends back selection ids of peperoni on de-selection', async () => {
    const onUpdateMock = jest.fn();
    renderToppingSelector(onUpdateMock);
    const pepperoniSelector = await screen.findByLabelText('pepperoni');
    const anchovySelector = await screen.findByLabelText('anchovy');
    fireEvent.click(pepperoniSelector);
    fireEvent.click(anchovySelector);
    fireEvent.click(pepperoniSelector);
    expect(onUpdateMock).toHaveBeenCalledTimes(4);
    expect(onUpdateMock).toHaveBeenNthCalledWith(4, new Set<number>([2]));
  });

  test('populated snapshot', async () => {
    const wrapper = renderToppingSelector();
    await screen.findByText('pepperoni');
    expect(wrapper).toMatchSnapshot();
  });
});
