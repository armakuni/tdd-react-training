import React, { useMemo, useState } from 'react';
import './App.css';
import ConfigContext from './ConfigContext';
import SizeSelector from './components/SizeSelector';
import ToppingsSelector from './components/ToppingsSelector';
import Pizza from './components/Pizza';

function App() {
  const config = useMemo(() => ({
    apiUrl: process.env.SERVER_PORT || 'http://localhost:5001',
  }), []);

  const [size, setSize] = useState('');
  const [topping, setTopping] = useState([{id: 1, name: 'pepperoni', price: 2}, {id: 2, name: 'mushrooms', price: 0.5}]);

  return (
    <div className="App">
      <header className="App-header">
        <div className='flex-container'>
          <div className='left-section'>
            <ConfigContext.Provider value={config}>
              <SizeSelector onUpdate={setSize} />
              <ToppingsSelector toppingOptions={topping} onUpdate={(selected) => console.log(selected)} />
            </ConfigContext.Provider>
          </div>
          <div className='right-section'>
            <Pizza size={size} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
