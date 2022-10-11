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
  const [currentSet] = useState<Set<string>>(new Set([]));

  function toggle(value: string) {
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
