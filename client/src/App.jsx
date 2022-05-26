import React, { useMemo, useState } from 'react';
import './App.css';
import ConfigContext from './ConfigContext';
import SizeSelector from './components/SizeSelector';
import Pizza from './components/Pizza';

function App() {
  const config = useMemo(() => ({
    apiUrl: 'http://localhost:5001',
  }), []);

  const [size, setSize] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <ConfigContext.Provider value={config}>
          <SizeSelector onUpdate={setSize} />
        </ConfigContext.Provider>
        <Pizza size={size} />
      </header>
    </div>
  );
}

export default App;
