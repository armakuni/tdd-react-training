import React from 'react';
import { render, screen } from '@testing-library/react';
import Pizza from './Pizza';

describe('Pizza', () => {
  it('displays the size', () => {
    render(<Pizza size="large" price="15.00" />);
    const sizeElement = screen.getByText(/Size:.*large/);
    expect(sizeElement).toBeInTheDocument();
  });

  it('displays the price', () => {
    render(<Pizza size="large" price="15.00" />);
    const sizeElement = screen.getByText(/Price:.*£15.00/);
    expect(sizeElement).toBeInTheDocument();
  });
});
