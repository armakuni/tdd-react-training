import { useCallback, useState } from 'react';
import './App.css';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import PizzaSummary from './components/PizzaSummary';
import SauceSelector from './components/SauceSelector';
import * as Pizza from './state/Pizza';
import { GetSizesResponse } from '../model/usecases/GetSizes';
import { GetSaucesResponse } from '../model/usecases/GetSauces';
import { GetToppingsResponse } from '../model/usecases/GetToppings';
import Loader from './components/Loader';
import { SummarisePizzaRequest, SummarisePizzaResponse } from '../model/usecases/SummarisePizza';

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

export interface UseCases {
  getSizes(): Promise<GetSizesResponse>;
  getSauces(): Promise<GetSaucesResponse>;
  getToppings(): Promise<GetToppingsResponse>;
  summarisePizza(pizza: SummarisePizzaRequest): Promise<SummarisePizzaResponse>;
}

interface AppProps {
  useCases: UseCases;
}

function App({ useCases }: AppProps) {
  const [pizza, setPizza] = useState(Pizza.create());

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
    const sizes = await useCases.getSizes();
    return Object.fromEntries(sizes.map(({ id, display }) => [id, display]));
  }, [useCases]);

  const getSauces = useCallback(async (): Promise<Record<string, string>> => {
    const sauces = await useCases.getSauces();
    return Object.fromEntries(sauces.map(({ id, display }) => [id, display]));
  }, [useCases]);

  const getToppings = useCallback(() => useCases.getToppings(), [useCases]);

  const getSummary = useCallback(
    () => useCases.summarisePizza({
      size: pizza.size || '',
      sauce: pizza.sauce || '',
      toppings: Array.from(pizza.toppings),
    }),
    [pizza.sauce, pizza.size, pizza.toppings, useCases],
  );

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
