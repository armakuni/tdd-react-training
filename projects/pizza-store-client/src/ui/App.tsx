import { useCallback, useState } from 'react';

interface AppProps {

}

function App({ }: AppProps) {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Ryan&apos;s Pizzeria</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
        </div>

        <div className="block">
          <h2 className="block__header">Your Order</h2>
            <div className="block__footer">
              <button className="order_button" type="submit">Buy</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App;
