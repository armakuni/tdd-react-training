import {
  Fragment, useEffect, useId, useState,
} from 'react';
import './ToppingsSelector.css';
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
  const [selected, setSelected] = useState(new Set<string>());
  const id = useId();

  useEffect(() => {
    onUpdate(selected);
  }, [onUpdate, selected]);

  const toggle = (toppingId: string) => {
    setSelected((current) => {
      const selectedCopy = new Set(current);
      if (selectedCopy.has(toppingId)) {
        selectedCopy.delete(toppingId);
      } else {
        selectedCopy.add(toppingId);
      }
      return selectedCopy;
    });
  };

  return (
    <Loader loader={fetchToppings}>
      {(toppings) => (
        <fieldset className="multiple-choice">
          <legend className="multiple-choice__question">Choose your toppings</legend>
          { toppings.map((topping) => (
            <Fragment key={topping.id}>
              <input
                id={`${id}-topping-${topping.id}`}
                type="checkbox"
                checked={selected.has(topping.id)}
                onChange={() => toggle(topping.id)}
              />
              <label htmlFor={`${id}-topping-${topping.id}`}>{ topping.display }</label>
              <br />
            </Fragment>
          )) }
        </fieldset>
      )}

    </Loader>
  );
}
