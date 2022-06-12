import { ReactElement, useId, useState } from 'react';
import './Options.css';

interface OptionProps {
  value: string;
  display: string;
  selected: boolean;
  onChange: () => void;
}

function Option({
  value, display, selected, onChange,
}: OptionProps) {
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
        {display}
      </label>
      <br />
    </>
  );
}

interface OptionsProps {
  question: string;
  options: Record<string, string>;
  initialValue?: string;
  onUpdate?: (_: string) => void;
}

const defaultOptionsProps = {
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
      { Object.entries(options).map(([value, display]) => (
        <Option
          value={value}
          display={display}
          key={value}
          selected={selectedValue === value}
          onChange={() => onChange(value)}
        />
      )) }
    </fieldset>
  );
}

Options.defaultProps = defaultOptionsProps;

export default Options;
