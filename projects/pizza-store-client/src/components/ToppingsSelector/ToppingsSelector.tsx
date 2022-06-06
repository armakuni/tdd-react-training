import { useEffect, useState } from 'react';

type toppingsSelectorProps = {
  toppingOptions: Topping[],
  onUpdate: (selected: Set<number>) => void
}

export type Topping = {
  id: number
  name: string
  price: number
}

export default function ToppingsSelector({ toppingOptions, onUpdate }: toppingsSelectorProps) {
  const [selected, setSelected] = useState(new Set<number>())

  useEffect(() => {
    onUpdate(selected)
  }, [onUpdate, selected])

  const toggle = (toppingId: number) => {
    setSelected((current) => {
      const selectedCopy = new Set(current);
      if (selectedCopy.has(toppingId)) {
        selectedCopy.delete(toppingId)
      } else {
        selectedCopy.add(toppingId)
      }
      return selectedCopy
    })
  }

  return (
    <fieldset>
      <legend>Toppings</legend>
      { toppingOptions.map((topping: Topping) => (
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
  );
}
