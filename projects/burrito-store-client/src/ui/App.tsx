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
  // const [fillings, setDillings] = useState<ApiData[]>([]);
  // const [extras, setExtras] = useState<ApiData[]>([]);
  // const [sizes, setSizes] = useState<ApiData[]>([]);


  // const fetchSizes = () => axios.get('http://localhost:5001/sizes')
  // const fetchEextras = () => axios.get('http://localhost:5001/extras')
  // const fetchFillings = () => axios.get('http://localhost:5001/fillings')
  
  
  // useEffect(() => {
  //   fetchSizes().then(r => setSizes(r.data))
  //   fetchExtras().then(r => setExtras(r.data))
  //   fetchFillings().then(r => setFillings(r.data))
  // }, [])

    return (
    <div className="app">
      <header className="app__header">
        <h1>Jon&apos;s Burrito Joint</h1>
      </header>

      <div className="columns">
        <div className="block">
          <h2 className="block__header">Build Your Order</h2>
          <fieldset className="options">
            <legend className="options__question">Choose your filling</legend>
            <Fragment><label className="options__option_label" htmlFor="chicken">chicken</label><input className="options__option_input" name="extras" id="chicken" value="chicken" type="radio"/><br/></Fragment>
          </fieldset>

          <fieldset className="options">
          <legend className="options__question">Choose your size</legend>
            <Fragment><label className="options__option_label" htmlFor="large">large</label><input className="options__option_input" name="sizes"id="large" value="large" type="radio"/><br/></Fragment>
          </fieldset>
        </div>

        <div className="block">
          <h2 className="block__header">Your Order:</h2>
          <div className="summary">
            <div className="summary__description">
              Large burrito
              <div className="summary__price">
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

