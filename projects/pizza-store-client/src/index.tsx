import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import setupUseCases from './setupUseCases';
import App from './ui/App';

const useCases = setupUseCases();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App useCases={useCases} />
  </React.StrictMode>,
);
