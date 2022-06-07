import { useMemo } from 'react';
import {
  act,
  fireEvent,
  render, screen,
} from '@testing-library/react';
import ConfigContext from '../../ConfigContext';
import ToppingsSelector from './ToppingsSelector';
import Config from '../../Config';
import { ReactNode } from 'react';

const toppings = [{ id: 1, name: 'pepperoni', price: 1 }, { id: 2, name: 'anchovy', price: 2.5 }, { id: 3, name: 'mushroom', price: 3.0 }];

interface WithConfigProps {
  config: Config
  children: ReactNode
}

function WithConfig({ config, children }: WithConfigProps) {
  return (
    <ConfigContext.Provider value={useMemo(() => config, [config])}>
      { children }
    </ConfigContext.Provider>
  );
}

function renderToppingSelector(
  onUpdate: undefined | jest.Mock = undefined,
) {
  const config = { apiUrl: 'http://example.com' };
  return render(
    <WithConfig config={config}>
      <ToppingsSelector toppingOptions={toppings} onUpdate={onUpdate || jest.fn()} />
    </WithConfig>,
  );
}

describe('ToppingsSelector', () => {
  it('displays the title', async () => {
    renderToppingSelector();
    const titleElement = await screen.findByText('Toppings');
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
    act(() => { 
      fireEvent.click(pepperoniSelector);
      fireEvent.click(anchovySelector);
    });
    expect(onUpdateMock).toHaveBeenCalledWith(new Set<number>([1,2]));
  });
  
  it('sends back selection ids of peperoni on de-selection', async () => {
    const onUpdateMock = jest.fn();
    renderToppingSelector(onUpdateMock);
    const pepperoniSelector = await screen.findByLabelText('pepperoni');
    const anchovySelector = await screen.findByLabelText('anchovy');
    act(() => { 
      fireEvent.click(pepperoniSelector);
      fireEvent.click(anchovySelector);
      fireEvent.click(pepperoniSelector);
    });
    expect(onUpdateMock).toHaveBeenCalledTimes(4)
    expect(onUpdateMock).toHaveBeenNthCalledWith(4,new Set<number>([2]));
  });

  test('populated snapshot', async () => {
    const wrapper = renderToppingSelector();
    await screen.findByText('pepperoni');
    expect(wrapper).toMatchSnapshot();
  });
});
