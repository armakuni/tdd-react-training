import { useCallback, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {AxiosResponse} from 'axios';

interface AppProps {

}

interface ApiData {
  id: string,
  display: string
}

function App({ }: AppProps) {
  // const [toppings, setToppings] = useState<ApiData[]>([]);
  // const [sauces, setSauces] = useState<ApiData[]>([]);
  // const [sizes, setSizes] = useState<ApiData[]>([]);


  // const fetchSizes = () => axios.get('http://localhost:5001/sizes')
  // const fetchSauces = () => axios.get('http://localhost:5001/sauces')
  // const fetchToppings = () => axios.get('http://localhost:5001/toppings')
  
  
  // useEffect(() => {
  //   fetchSizes().then(r => setSizes(r.data))
  //   fetchSauces().then(r => setSauces(r.data))
  //   fetchToppings().then(r => setToppings(r.data))
  // }, [])

    return (
    <div className="app">
      <header className="app__header">
        <h1>Jon&apos;s Pizzeria</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
          <fieldset className="options">
            <legend className="options__question">Choose your sauce</legend>
            <Fragment><label className="options__option_label" htmlFor="tomato">tomato</label><input className="options__option_input" name="sauces" id="tomato" value="tomato" type="radio"/><br/></Fragment>
          </fieldset>

          <fieldset className="options">
          <legend className="options__question">Choose your size</legend>
            <Fragment><label className="options__option_label" htmlFor="large">large</label><input className="options__option_input" name="sizes"id="large" value="large" type="radio"/><br/></Fragment>
          </fieldset>
        </div>

        <div className="block">
          <h2 className="block__header">Your Order:</h2>
          <div className="pizza-summary">
            <div className="pizza-summary__description">
              Large pizza
              <div className="pizza-summary__price">
              &pound;
              15
              </div>
            </div>
          </div>

          <div className="block__footer">
            <button className="order_button" type="submit">Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;

