import './ToppingsSelector.css';
import Loader from '../Loader';
import {
  Fragment, useEffect, useId, useState,
} from 'react';

export interface ToppingDetails {
  id: string;
  display: string;
}

export type ToppingsFetcher = () => Promise<ToppingDetails[]>

type ToppingsSelectorProps = {
  fetchToppings: ToppingsFetcher;
  onUpdate: (selected: Set<string>) => void;
}

export default function ToppingsSelector({ fetchToppings, onUpdate }: ToppingsSelectorProps) {
  // TODO Implement a set of checkboxes for the set of toppings returned by fetchToppings

  // TODO Each time a checkbox is checked or unchecked, set the set of selected topping IDs back with onUpdate()

  // TODO Use <Loader loader={fetchToppings}></Loader> to provide the data for the component
  // TODO Make the final output look like this
  // <fieldset className="multiple-choice">
  //   <legend className="multiple-choice__question">Choose your toppings</legend>
  //   <input
  //     id="???-topping-olives"
  //     type="checkbox"
  //   />
  //   <label for="???-topping-olives">Olives</label>
  //   <br />
  //   <input
  //     id="???-topping-rocket"
  //     type="checkbox"
  //   />
  //   <label for="???-topping-rocket">Rocket</label>
  //   <br />
  // </fieldset>;

  return <div className="under-construction" />;
}
