import { render, screen } from '@testing-library/react';
import PizzaSummary from './PizzaSummary';

describe('PizzaSummary', () => {
  it('displays the size', () => {
    render(<PizzaSummary size="large" price="15.00" />);
    const sizeElement = screen.getByText(/Size:.*large/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('displays the price', () => {
    render(<PizzaSummary size="large" price="15.00" />);
    const sizeElement = screen.getByText(/Price:.*£15.00/);
    expect(sizeElement).toBeInTheDocument();
  });
});
