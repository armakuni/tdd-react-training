import groupBy from './groupBy';

describe('groupBy()', () => {
  it('returns grouped items', () => {
    expect(groupBy((item) => item[0], ['x1', 'y1', 'x2', 'y2'])).toEqual({
      x: ['x1', 'x2'],
      y: ['y1', 'y2'],
    });
  });
});
