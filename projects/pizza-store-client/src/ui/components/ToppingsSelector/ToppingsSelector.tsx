import {
  Fragment, useEffect, useState,
} from 'react';
import './ToppingsSelector.css';
import { FetchToppings } from '../../../model/ToppingRepository';
import Loader from '../Loader';
import { Topping } from '../../../model/Topping';

type ToppingsSelectorProps = {
  fetchToppings: FetchToppings;
  onUpdate: (selected: Set<number>) => void;
}

export default function ToppingsSelector({ fetchToppings, onUpdate }: ToppingsSelectorProps) {
  const [selected, setSelected] = useState(new Set<number>());

  useEffect(() => {
    onUpdate(selected);
  }, [onUpdate, selected]);

  const toggle = (toppingId: number) => {
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
          { toppings.map((topping: Topping) => (
            <Fragment key={topping.id}>
              <input
                readOnly
                id={topping.id.toString()}
                value={topping.name}
                type="checkbox"
                checked={selected.has(topping.id)}
                onChange={() => toggle(topping.id)}
              />
              <label htmlFor={topping.id.toString()}>{ topping.name }</label>
              <br />
            </Fragment>
          )) }
        </fieldset>
      )}

    </Loader>
  );
}
