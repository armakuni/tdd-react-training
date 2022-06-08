import { useEffect, useState } from 'react';
import { Topping } from './index';
import ToppingsLoader from '../ToppingsLoader';

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
        <fieldset>
          <legend>Toppings</legend>
          { toppings.map((topping: Topping) => (
            <>
              <input
                readOnly
                id={topping.id.toString()}
                value={topping.name}
                type="checkbox"
                key={topping.id}
                checked={selected.has(topping.id)}
                onChange={() => toggle(topping.id)}
              />
              <label htmlFor={topping.id.toString()}>{ topping.name }</label>
              <br />
            </>
          )) }
        </fieldset>
      )}

    </ToppingsLoader>
  );
}
