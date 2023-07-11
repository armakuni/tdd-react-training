import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './ui/App.css'
import './ui/Options.css'
import App from './ui/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
