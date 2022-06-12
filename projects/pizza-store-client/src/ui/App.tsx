import { useCallback, useState } from 'react';
import './App.css';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import PizzaSummary from './components/PizzaSummary';
import { calculatePizzaCost } from './components/PriceCalculator/PriceCalculator';
import SauceSelector from './components/SauceSelector';
import * as Pizza from './state/Pizza';
import { fetchSizes } from '../infrastructure/HTTPSizeRespository';
import { fetchSauces } from '../infrastructure/HTTPSauceRepository';
import { fetchToppings } from '../infrastructure/HTTPToppingRepository';
import GetSizes from '../model/usecases/GetSizes';
import GetSauces from '../model/usecases/GetSauces';
import GetToppings from '../model/usecases/GetToppings';
import GetPrices from '../model/usecases/GetPrices';
import groupBy from '../helpers/groupBy';
import Loader from './components/Loader';

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

function App() {
  const [pizza, setPizza] = useState(Pizza.create());

  const getPrices = useCallback(async () => {
    const priceList = await new GetPrices(fetchSizes, fetchToppings).execute();

    const result = groupBy((price) => price.type, priceList);

    return {
      sizes: result.size.map((size) => ({ ...size, size: size.id })),
      toppings: result.topping,
    };
  }, []);

  const selectSize = useCallback((size: string) => {
    setPizza((current) => Pizza.setSize(current, size));
  }, []);

  const selectSauce = useCallback((sauce: string) => {
    setPizza((current) => Pizza.setSauce(current, sauce));
  }, []);

  const selectToppings = useCallback((toppings: Set<string>) => {
    setPizza((current) => Pizza.setToppings(current, toppings));
  }, []);

  const getSizes = useCallback(async (): Promise<Record<string, string>> => {
    const sizes = await new GetSizes(fetchSizes).execute();
    return Object.fromEntries(sizes.map(({ id, display }) => [id, display]));
  }, []);

  const getSauces = useCallback(async () => {
    const sauces = await new GetSauces(fetchSauces).execute();
    return Object.fromEntries(sauces.map(({ id, display }) => [id, display]));
  }, []);

  const getToppings = useCallback(() => new GetToppings(fetchToppings).execute(), []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Ryan&apos;s Pizzeria</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
          <SizeSelector onUpdate={selectSize} fetchSizes={getSizes} />
          <SauceSelector onUpdate={selectSauce} fetchSauces={getSauces} />
          <ToppingsSelector onUpdate={selectToppings} fetchToppings={getToppings} />
        </div>

        <div className="block">
          <h2 className="block__header">Your Order</h2>
          <Loader loader={getPrices}>
            {(prices) => (
              <PizzaSummary
                size={pizza.size as string}
                price={calculatePizzaCost(prices)(pizza) as string}
              />
            )}
          </Loader>
          <div className="block__footer">
            <button className="order_button" type="submit" onClick={submitOrder}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
