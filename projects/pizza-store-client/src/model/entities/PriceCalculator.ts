import { PriceList } from './PriceList';
import { Pizza } from './Pizza';

export type PriceCalculator = (prices: PriceList, pizza: Pizza) => Promise<number>;
