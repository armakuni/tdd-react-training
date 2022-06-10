import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SizeSelector from './SizeSelector';
import { FetchSizes } from '../../model/SizeRepository';

function renderSizeSelector(
  onUpdate: (_value: string) => void,
): RenderResult {
  const fetchSizes: FetchSizes = () => new Promise((resolve) => {
    resolve(['big', 'small']);
  });

  return render(
    <SizeSelector onUpdate={onUpdate} fetchSizes={fetchSizes} />,
  );
}

describe('SizeSelector', () => {
  let onUpdate: (_value: string) => void;
  let view: RenderResult;

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = renderSizeSelector(onUpdate);
    await screen.findByText('big');
  });
  it('displays the title', () => {
    const titleElement = screen.getByText('Select the size of your pizza');
    expect(titleElement).toBeVisible();
  });

  it('displays the sizes', () => {
    expect(screen.getByText('big')).toBeVisible();
    expect(screen.getByText('small')).toBeVisible();
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });

  it('sends back selections on change', () => {
    fireEvent.click(screen.getByText('big'));
    expect(onUpdate).toBeCalledWith('big');
  });
});
