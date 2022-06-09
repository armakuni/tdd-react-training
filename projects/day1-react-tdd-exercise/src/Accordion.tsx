import { ReactElement, useState } from 'react';
import './Accordion.css';

interface AccordionSection {
  title: string
  items: string[]
}

interface AccordionContainer {
  items: AccordionSection[]
}

function DisplayAccordionItems({ items }: {items: string[]}) {
  return (
    <div className="accordion__items">
      {items.map((i) => (
        <div className="accordion__item">{i}</div>))}
    </div>
  );
}

export default function Accordion({ items }: AccordionContainer): ReactElement {
  const [showSection, setShowSection] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, idx) => (
        <div className={`accordion__section accordion__section--${showSection === idx ? 'opened' : 'closed'}`}>
          <div className="accordion__section-title" role="button" onClick={() => setShowSection(idx)}>{item.title}</div>
          { showSection === idx && <DisplayAccordionItems items={item.items} />}
        </div>
      ))}
    </div>
  );
}
