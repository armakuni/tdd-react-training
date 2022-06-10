import {
  act, fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SauceSelector from './SauceSelector';
import { FetchSauces } from '../../model/SauceRepository';

function renderSauceSelector(
  onUpdate: ((_value: string) => void) | undefined = undefined,
): RenderResult | undefined {
  const fetchSauces: FetchSauces = () => new Promise((resolve) => {
    resolve(['tomato', 'no-sauce']);
  });

  return render(
    <SauceSelector fetchSauces={fetchSauces} onUpdate={onUpdate || jest.fn()} />,
  );
}

describe('SauceSelector', () => {
  it('displays the title', async () => {
    renderSauceSelector();
    const titleElement = await screen.findByText('Select the sauce for your pizza');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the sauces', async () => {
    renderSauceSelector();
    const tomatoElement = await screen.findByText('tomato');
    const noSauceElement = await screen.findByText('no-sauce');

    expect(tomatoElement).toBeInTheDocument();
    expect(noSauceElement).toBeInTheDocument();
  });

  test('populated snapshot', async () => {
    const wrapper = renderSauceSelector();
    await screen.findByText('tomato');
    expect(wrapper).toMatchSnapshot();
  });

  it('sends back selections on change', async () => {
    const onUpdate = jest.fn();
    renderSauceSelector(onUpdate);
    const tomatoSelector = await screen.findByLabelText('tomato');
    act(() => { fireEvent.click(tomatoSelector); });
    expect(onUpdate).toBeCalledWith('tomato');
  });
});
