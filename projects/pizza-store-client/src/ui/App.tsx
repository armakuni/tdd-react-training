import { useCallback, useState } from 'react';
import './App.css';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import PizzaSummary from './components/PizzaSummary';
import SauceSelector from './components/SauceSelector';
import * as Pizza from './state/Pizza';
import { fetchSizes } from '../infrastructure/HTTPSizeRespository';
import { fetchSauces } from '../infrastructure/HTTPSauceRepository';
import { fetchToppings } from '../infrastructure/HTTPToppingRepository';
import GetSizes from '../model/usecases/GetSizes';
import GetSauces from '../model/usecases/GetSauces';
import GetToppings from '../model/usecases/GetToppings';
import PriceListLoader from '../model/entities/PriceListLoader';
import Loader from './components/Loader';
import SummarisePizza from '../model/usecases/SummarisePizza';
import calculatePrice from '../model/entities/calculatePrice';

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

function App() {
  const [pizza, setPizza] = useState(Pizza.create());

  const getSummary = useCallback(
    () => new SummarisePizza(
      () => new PriceListLoader(fetchSizes, fetchToppings).load(),
      calculatePrice,
    ).execute({
      size: pizza.size || '',
      sauce: pizza.sauce || '',
      toppings: Array.from(pizza.toppings),
    }),
    [pizza],
  );

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

  const getSauces = useCallback(async (): Promise<Record<string, string>> => {
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
          <Loader loader={getSummary}>
            {(summary) => (
              <>
                <PizzaSummary
                  size={summary.size}
                  sauce={summary.sauce}
                  toppings={summary.toppings}
                  price={summary.price.toString()}
                />
                <div className="block__footer">
                  <button className="order_button" type="submit" onClick={submitOrder}>Buy</button>
                </div>
              </>
            )}
          </Loader>
        </div>
      </div>
    </div>
  );
}

export default App;
