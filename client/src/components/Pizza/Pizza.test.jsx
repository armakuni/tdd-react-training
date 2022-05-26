import React from 'react';
import { render, screen } from '@testing-library/react';
import Pizza from './Pizza';

describe('Pizza', () => {
  it('displays the size', () => {
    render(<Pizza size="big" />);
    const sizeElement = screen.getByText(/Size:.*big/);
    expect(sizeElement).toBeInTheDocument();
  });
});
