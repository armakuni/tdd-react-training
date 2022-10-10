import './ToppingsSelector.css';
import { useState } from 'react';
import Loader from '../Loader';

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
  // const toppings = fetchToppings();

  const [currentSet, setSelectedValue] = useState<Set<string>>(new Set([]));

  // useEffect(() => {
  //   console.log('use effect');
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   toppings.then((toppinglist) => setToppingsList(toppinglist));
  // }, []);

  // TODO Each time a checkbox is checked or unchecked, set the set of selected topping IDs back with onUpdate()

  function toggle(value: string) {
    setSelectedValue(currentSet);
    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }
    onUpdate(new Set(currentSet));
  }

  return (
    <Loader loader={fetchToppings}>
      {(toppings) => (
        <fieldset className="multiple-choice">
          <legend className="multiple-choice__question">Choose your toppings</legend>
          {toppings.map(({ id, display }) => (
            <div key={id}>
              <input
                id={id}
                type="checkbox"
                value={id}
                checked={currentSet.has(id)}
                onChange={() => toggle(id)}
              />
              <label htmlFor={id}>{display}</label>
            </div>
          ))}
        </fieldset>
      )}
    </Loader>
  );
}
