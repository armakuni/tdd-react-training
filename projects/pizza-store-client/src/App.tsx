import { useMemo, useState } from 'react';
import './App.css';
import ConfigContext from './ConfigContext';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import Pizza from './components/Pizza';
import { calculatePizzaCost } from './components/PriceCalculator/PriceCalculator';

function submitOrder(): boolean {
  // eslint-disable-next-line no-alert
  alert('Sorry, no pizza today!');
  return false;
}

function App() {
  const config = useMemo(() => ({
    apiUrl: process.env.SERVER_PORT || 'http://localhost:5001',
  }), []);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedToppings, setSelectedToppings] = useState(new Set<number>());

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

  const pizza = { size: selectedSize, toppings: Array.from(selectedToppings) };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Ryan&apos;s Pizzeria</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
          <ConfigContext.Provider value={config}>
            <SizeSelector onUpdate={setSelectedSize} />
            <ToppingsSelector onUpdate={(selected: Set<number>) => setSelectedToppings(selected)} />
          </ConfigContext.Provider>
        </div>

        <div className="block">
          <h2 className="block__header">Your Order</h2>
          <Pizza size={selectedSize} price={calculatePizzaCost(prices)(pizza) as string} />
          <div className="block__footer">
            <button className="order_button" type="submit" onClick={submitOrder}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
