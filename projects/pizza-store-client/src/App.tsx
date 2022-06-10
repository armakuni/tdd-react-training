import { useCallback, useMemo, useState } from 'react';
import './App.css';
import ConfigContext from './ConfigContext';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import PizzaSummary from './components/PizzaSummary';
import { calculatePizzaCost } from './components/PriceCalculator/PriceCalculator';
import SauceSelector from './components/SauceSelector';
import * as Pizza from './model/Pizza';
import { ToppingID } from './model/Topping';
import { Sauce } from './model/Sauce';
import { Size } from './model/Size';
import { fetchSizes } from './infrastructure/HTTPSizeRespository';
import { fetchSauces } from './infrastructure/HTTPSauceRepository';
import { fetchToppings } from './infrastructure/HTTPToppingRepository';

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

function App() {
  const config = useMemo(() => ({
    apiUrl: process.env.SERVER_PORT || 'http://localhost:5001',
  }), []);

  const [pizza, setPizza] = useState(Pizza.create());

  const prices = {
    sizes: [{ size: 'large', price: 15, toppingPriceMultiplier: 2 },
      { size: 'medium', price: 10, toppingPriceMultiplier: 1.5 },
      { size: 'small', price: 5, toppingPriceMultiplier: 1 },
      { size: '', price: 0 }],
    toppings: [{ id: 1, name: 'mushroom', price: 0.5 },
      { id: 2, name: 'anchovy', price: 1 },
      { id: 3, name: 'pepperoni', price: 1.5 },
      { id: 4, name: 'ham', price: 1.5 },
      { id: 5, name: 'olives', price: 0.5 },
      { id: 6, name: 'chillis', price: 1 }],
  };

  const selectSize = useCallback((size: Size) => {
    setPizza((current) => Pizza.setSize(current, size));
  }, []);

  const selectSauce = useCallback((sauce: Sauce) => {
    setPizza((current) => Pizza.setSauce(current, sauce));
  }, []);

  const selectToppings = useCallback((toppings: Set<ToppingID>) => {
    setPizza((current) => Pizza.setToppings(current, toppings));
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Ryan&apos;s Pizzeria</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
          <ConfigContext.Provider value={config}>
            <SizeSelector onUpdate={selectSize} fetchSizes={fetchSizes} />
            <SauceSelector onUpdate={selectSauce} fetchSauces={fetchSauces} />
            <ToppingsSelector onUpdate={selectToppings} fetchToppings={fetchToppings} />
          </ConfigContext.Provider>
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
