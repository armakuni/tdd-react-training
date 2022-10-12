import React, { ReactElement, useState } from 'react';
// import './Accordion.css';

interface AccordionProps {
    title: string
}

export default function Accordion({ title }: AccordionProps): ReactElement {
    return (
        <>
        <h2>{title}</h2>
        </>
    )
}