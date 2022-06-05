import React, { ReactElement, useState } from 'react';
import './Spoiler.css';

interface SpoilerProps {
  title: string
  content: string
}

export default function Spoiler({ title, content }: SpoilerProps): ReactElement {
  const [show, setShow] = useState(false);

  function toggle(): void {
    setShow((visible) => !visible);
  }

  const toggleButton: ReactElement = show
    ? <button type="button" className="spoiler__button" onClick={toggle}>Hide</button>
    : <button type="button" className="spoiler__button" onClick={toggle}>Show</button>;

  const contentElement = show ? <div className="spoiler__content">{content}</div> : '';

  return (
    <div className="spoiler">
      <div className="spoiler__header">
        {toggleButton}
        <div className="spoiler__title">{title}</div>
      </div>
      {contentElement}
    </div>
  );
}
