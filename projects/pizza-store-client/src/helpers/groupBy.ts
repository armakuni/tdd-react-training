export default function groupBy<Item>(f: (item: Item) => string, items: Item[]): Record<string, Item[]> {
  const result: Record<string, Item[]> = {};

  items.forEach((item) => {
    const key = f(item);
    if (!(key in result)) { result[key] = []; }
    result[key].push(item);
  });

  return result;
}
