import {
  act, fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SizeSelector from './SizeSelector';
import { FetchSizes } from '../../model/SizeRepository';

function renderSizeSelector(
  onUpdate: ((_value: string) => void) | undefined = undefined,
): RenderResult | undefined {
  const fetchSizes: FetchSizes = () => new Promise((resolve) => {
    resolve(['big', 'small']);
  });

  return render(
    <SizeSelector onUpdate={onUpdate || jest.fn()} fetchSizes={fetchSizes} />,
  );
}

describe('SizeSelector', () => {
  it('displays the title', async () => {
    renderSizeSelector();
    const titleElement = await screen.findByText('Select the size of your pizza');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the sizes', async () => {
    renderSizeSelector();
    const bigElement = await screen.findByText('big');
    const smallElement = await screen.findByText('small');

    expect(bigElement).toBeInTheDocument();
    expect(smallElement).toBeInTheDocument();
  });

  test('populated snapshot', async () => {
    const wrapper = renderSizeSelector();
    await screen.findByText('big');
    expect(wrapper).toMatchSnapshot();
  });

  it('sends back selections on change', async () => {
    const onUpdate = jest.fn();
    renderSizeSelector(onUpdate);
    const bigSelector = await screen.findByLabelText('big');
    act(() => { fireEvent.click(bigSelector); });
    expect(onUpdate).toBeCalledWith('big');
  });
});
