import { useEffect, useState } from 'react';

export default function ToppingsSelector({ toppingOptions, onUpdate }) {
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    onUpdate(selected);
  }, [onUpdate, selected]);

  const toggle = (toppingId) => {
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
    <fieldset>
      <legend>Toppings</legend>
      { toppingOptions.map((topping) => (
        <>
          <input
            readOnly
            id={topping.id}
            value={topping.name}
            type="checkbox"
            key={topping.id}
            checked={selected.has(topping.id)}
            onChange={() => toggle(topping.id)}
          />
          <label htmlFor={topping.id}>{ topping.name }</label>
          <br />
        </>
      )) }
    </fieldset>
  );
}
