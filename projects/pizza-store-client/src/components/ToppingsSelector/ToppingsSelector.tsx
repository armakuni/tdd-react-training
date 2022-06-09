import { Fragment, useEffect, useState } from 'react';
import { Topping } from './index';
import ToppingsLoader from '../ToppingsLoader';
import './ToppingsSelector.css';

type toppingsSelectorProps = {
  onUpdate: (selected: Set<number>) => void
}

export default function ToppingsSelector({ onUpdate }: toppingsSelectorProps) {
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
    <ToppingsLoader>
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

    </ToppingsLoader>
  );
}
