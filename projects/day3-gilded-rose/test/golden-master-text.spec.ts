import { GildedRose, Item } from '../app/GildedRose';
import * as fs from 'fs';
import * as path from 'path'

describe('gilded rose', () => {
  test('golden master', () => {
    const itemNames = [
      "Aged Brie",
      "Elixir of the Mongoose",
      "Sulfuras, Hand of Ragnaros",
      "Backstage passes to a TAFKAL80ETC concert",
    ];

    const sellIns = [
      -1, 0, 1, 5, 6, 7, 9, 10, 11
    ];

    const qualities = [
      1, 49, 50, 51
    ];

    const days = 2;

    const items = itemNames.flatMap(
      name => sellIns.flatMap(
        sellIn => qualities.flatMap(
          quality => new Item(name, sellIn, quality))));

    const gildedRose = new GildedRose(items);

    let lines: string[] = [];
    for (let i = 0; i < days; i++) {
      lines = [
        ...lines,
        "-------- day " + i + " --------",
        "name, sellIn, quality",
        ...items.map(element => `"${element.name}" ${element.sellIn} ${element.quality}`),
      ]
      gildedRose.updateQuality();
    }

    const goldenMasterPath = path.join(__dirname, 'golden-master.txt');

    if (fs.existsSync(goldenMasterPath)) {
      const expected = fs.readFileSync(goldenMasterPath).toString().split('\n');
      expect(lines).toEqual(expected);
    } else {
      fs.writeFileSync(goldenMasterPath, lines.join('\n'));
    }
  });
})

