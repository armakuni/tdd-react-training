import React, { ReactElement, useId, useState } from 'react';

interface OptionProps {
  value: string
  selected: boolean
  onChange: () => void
}

function Option({ value, selected, onChange }: OptionProps) {
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

interface OptionsProps {
  question: string
  options: string[]
  // todo: Remove this!!!
  // eslint-disable-next-line react/require-default-props
  initialValue?: string
  // todo: Remove this!!!
  // eslint-disable-next-line react/require-default-props
  onUpdate?: (_: string) => void
}

export default function Options({
  question, options, initialValue = undefined, onUpdate = undefined,
}: OptionsProps): ReactElement {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  function onChange(value: string) {
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
