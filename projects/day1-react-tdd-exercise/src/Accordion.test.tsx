import { fireEvent, render, screen } from '@testing-library/react';
import Accordion from './Accordion';

describe('<Accordion />', () => {
  beforeEach(() => {
    const accordionItems = [
      {
        title: 'Bakery',
        items: ['Donuts', 'Croissants'],
      },
      {
        title: 'Dairy',
        items: ['yoghurt', 'milk'],
      },
    ];

    render(<Accordion items={accordionItems} />);
  });

  describe('accordion is in a closed state', () => {
    test('Accordion lists all sections with a title', () => {
      expect(screen.getByText('Bakery')).toBeVisible();
      expect(screen.getByText('Dairy')).toBeVisible();
    });

    test('Accordion bakery section does not display section contents before clicked', () => {
      expect(screen.queryByText('Donuts')).not.toBeInTheDocument();
      expect(screen.queryByText('Croissants')).not.toBeInTheDocument();
    });
  });

  describe('accordion is in a open state', () => {
    test('Accordion section clicked responds with items', () => {
      fireEvent.click(screen.getByText('Bakery'));
      expect(screen.getByText('Donuts')).toBeVisible();
      expect(screen.getByText('Croissants')).toBeVisible();
    });

    test('Accordion bakery section displays the items but no other section displayed', () => {
      fireEvent.click(screen.getByText('Bakery'));
      expect(screen.queryByText('milk')).not.toBeInTheDocument();
    });
  });
});
