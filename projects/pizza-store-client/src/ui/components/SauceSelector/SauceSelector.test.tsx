import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SauceSelector, { SaucesFetcher } from './SauceSelector';

describe('SauceSelector', () => {
  let view: RenderResult;
  let onUpdate: (_value: string) => void;

  const fetchSauces: SaucesFetcher = () => Promise.resolve({ tomato: 'Tomato', 'no-sauce': 'None' });

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = render(
      <SauceSelector fetchSauces={fetchSauces} onUpdate={onUpdate} />,
    );
    await screen.findByLabelText('Tomato');
  });

  it('displays the title', () => {
    const titleElement = screen.getByText('Select the sauce for your pizza');
    expect(titleElement).toBeVisible();
  });

  it('displays the sauces', () => {
    expect(screen.getByLabelText('Tomato')).toBeVisible();
    expect(screen.getByLabelText('None')).toBeVisible();
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });

  it('sends back selections on change', () => {
    fireEvent.click(screen.getByLabelText('Tomato'));
    expect(onUpdate).toBeCalledWith('tomato');
  });
});
