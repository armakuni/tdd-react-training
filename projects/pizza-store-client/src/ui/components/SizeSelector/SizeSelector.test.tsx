import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SizeSelector, { SizesFetcher } from './SizeSelector';

describe('SizeSelector', () => {
  let onUpdate: (_value: string) => void;
  let view: RenderResult;

  const fetchSizes: SizesFetcher = () => Promise.resolve({ big: 'Big', small: 'Small' });

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = render(
      <SizeSelector onUpdate={onUpdate} fetchSizes={fetchSizes} />,
    );
    await screen.findByLabelText('Big');
  });
  it('displays the title', () => {
    const titleElement = screen.getByText('Select the size of your pizza');
    expect(titleElement).toBeVisible();
  });

  it('displays the sizes', () => {
    expect(screen.getByLabelText('Big')).toBeVisible();
    expect(screen.getByLabelText('Small')).toBeVisible();
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });

  it('sends back selections on change', () => {
    fireEvent.click(screen.getByLabelText('Big'));
    expect(onUpdate).toBeCalledWith('big');
  });
});
