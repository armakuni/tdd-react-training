import './ToppingsSelector.css';
import { useEffect, useState } from 'react';

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
  // const toppings = [{id: 'test', display: 'test'}]
  // const fetchSizes: ToppingsFetcher = () => Promise.resolve(toppings);
  const toppings = fetchToppings()

  const[toppingsList, setToppingsList] = useState<ToppingDetails[]>()

  useEffect(() => {
    toppings.then(toppinglist => setToppingsList(toppinglist))
  }, [])

  // TODO Each time a checkbox is checked or unchecked, set the set of selected topping IDs back with onUpdate()

  return (
    <fieldset className="multiple-choice">
      <legend className="multiple-choice__question">Choose your toppings</legend>
      {toppingsList?.map(({id, display}) => (
        <label key={id}>
          {display}
          <input
            id={id + "topping-olives"}
            type="checkbox"
          />
        </label>
      ))}
    </fieldset>
  );
}
