import React, {ReactElement} from "react";

interface AccordionProps {
  items: AccordionItem[],
}

interface AccordionItem {
  title: string,
  items: string[],
}

export default function Accordion(): ReactElement {
  return <div></div>
}
