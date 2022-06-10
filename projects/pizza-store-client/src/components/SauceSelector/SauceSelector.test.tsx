import {
  fireEvent, render, RenderResult, screen,
} from '@testing-library/react';
import SauceSelector from './SauceSelector';
import { FetchSauces } from '../../model/SauceRepository';

describe('SauceSelector', () => {
  let view: RenderResult;
  let onUpdate: (_value: string) => void;

  const fetchSauces: FetchSauces = () => new Promise((resolve) => {
    resolve(['tomato', 'no-sauce']);
  });

  beforeEach(async () => {
    onUpdate = jest.fn();
    view = render(
      <SauceSelector fetchSauces={fetchSauces} onUpdate={onUpdate} />,
    );
    await screen.findByText('tomato');
  });

  it('displays the title', () => {
    const titleElement = screen.getByText('Select the sauce for your pizza');
    expect(titleElement).toBeVisible();
  });

  it('displays the sauces', () => {
    expect(screen.getByText('tomato')).toBeVisible();
    expect(screen.getByText('no-sauce')).toBeVisible();
  });

  test('populated snapshot', () => {
    expect(view).toMatchSnapshot();
  });

  it('sends back selections on change', () => {
    fireEvent.click(screen.getByLabelText('tomato'));
    expect(onUpdate).toBeCalledWith('tomato');
  });
});
