import React, { useMemo, useState } from 'react';
import './App.css';
import ConfigContext from './ConfigContext';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import Pizza from './components/Pizza';
import { calculatePizzaCost } from './components/PriceCalculator/PriceCalculator';
import { Topping } from './components/ToppingsSelector/ToppingsSelector';

function App() {
  const config = useMemo(() => ({
    apiUrl: process.env.SERVER_PORT || 'http://localhost:5000',
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
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <div className="left-section">
            <ConfigContext.Provider value={config}>
              <SizeSelector onUpdate={setSelectedSize} />
              <ToppingsSelector
                toppingOptions={prices.toppings as Topping[]}
                onUpdate={(selected: Set<number>) => { setSelectedToppings(selected); }}
              />
            </ConfigContext.Provider>
          </div>
          <div className="right-section">
            <Pizza size={selectedSize} price={calculatePizzaCost(prices)(pizza)} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
