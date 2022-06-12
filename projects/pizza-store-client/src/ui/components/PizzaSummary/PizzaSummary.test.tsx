import { render, RenderResult, screen } from '@testing-library/react';
import PizzaSummary from './PizzaSummary';

describe('PizzaSummary', () => {
  let view: RenderResult;

  beforeEach(() => {
    view = render(
      <PizzaSummary
        size="large"
        sauce="tomato"
        toppings={['olives', 'chillis']}
        price="15.00"
      />,
    );
  });

  it('displays the size', () => {
    const sizeElement = screen.getByText(/large/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('displays the sauce', () => {
    const sizeElement = screen.getByText(/tomato/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('displays the toppings', () => {
    const sizeElement = screen.getByText(/olives, chillis/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('displays the price', () => {
    const sizeElement = screen.getByText(/£15.00/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    expect(view).toMatchSnapshot();
  });
});
