import React, { useId, useState } from 'react';

function Option({ value, selected, onChange }) {
  const id = useId();

  const inputId = `${id}-radio`;

  return (
    <>
      <input id={inputId} type="radio" value={value} checked={selected} onChange={() => onChange()} />
      <label htmlFor={inputId}>{ value }</label>
      <br />
    </>
  );
}

export default function Options({
  question, options, initialValue = undefined, onUpdate = undefined,
}) {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  function onChange(value) {
    setSelectedValue(value);
    if (onUpdate) onUpdate(value);
  }

  return (
    <fieldset>
      <legend>{ question }</legend>
      { options.map((value) => (
        <Option
          value={value}
          key={value}
          selected={selectedValue === value}
          onChange={() => onChange(value)}
        />
      )) }
    </fieldset>
  );
}
