import { ReactElement, useId, useState } from 'react';
import './Options.css';

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
      <input
        className="options__option_input"
        id={inputId}
        type="radio"
        value={value}
        checked={selected}
        onChange={() => onChange()}
      />
      <label
        className="options__option_label"
        htmlFor={inputId}
      >
        { value }
      </label>
      <br />
    </>
  );
}

interface OptionsProps {
  question: string
  options: string[]
  initialValue?: string
  onUpdate?: (_: string) => void
}

const defaultProps = {
  initialValue: undefined,
  onUpdate: undefined,
};

function Options({
  question, options, initialValue, onUpdate,
}: OptionsProps): ReactElement {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  function onChange(value: string) {
    setSelectedValue(value);
    if (onUpdate) onUpdate(value);
  }

  return (
    <fieldset className="options">
      <legend className="options__question">{ question }</legend>
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

Options.defaultProps = defaultProps;

export default Options;
