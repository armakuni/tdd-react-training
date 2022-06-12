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

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

function App() {
  const [pizza, setPizza] = useState(Pizza.create());

  const prices = {
    sizes: [
      { size: 'large', price: 15, toppingPriceMultiplier: 2 },
      { size: 'medium', price: 10, toppingPriceMultiplier: 1.5 },
      { size: 'small', price: 5, toppingPriceMultiplier: 1 },
      { size: '', price: 0 }],
    toppings: [
      { id: 'mushroom', price: 0.5 },
      { id: 'anchovy', price: 1 },
      { id: 'pepperoni', price: 1.5 },
      { id: 'ham', price: 1.5 },
      { id: 'olives', price: 0.5 },
      { id: 'chillis', price: 1 }],
  };

  const selectSize = useCallback((size: string) => {
    setPizza((current) => Pizza.setSize(current, size));
  }, []);

  const selectSauce = useCallback((sauce: string) => {
    setPizza((current) => Pizza.setSauce(current, sauce));
  }, []);

  const selectToppings = useCallback((toppings: Set<string>) => {
    setPizza((current) => Pizza.setToppings(current, toppings));
  }, []);

  const getSizes = useCallback(() => new GetSizes(fetchSizes).execute(), []);
  const getSauces = useCallback(() => new GetSauces(fetchSauces).execute(), []);
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
          <PizzaSummary size={pizza.size as string} price={calculatePizzaCost(prices)(pizza) as string} />
          <div className="block__footer">
            <button className="order_button" type="submit" onClick={submitOrder}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
