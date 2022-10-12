import React, { ReactElement, useState } from 'react';
import './Spoiler.css';

interface SpoilerProps {
  title: string
  content: string
}

const SpoilerState = {
  HIDDEN: 'hidden',
  SHOWING: 'showing'
}

const ButtonText = {
  SHOW: 'Show',
  HIDE: 'Hide'
}

export default function Spoiler({ title, content }: SpoilerProps): ReactElement {
  const [spoilerState, setSpoilerState] = useState(SpoilerState.HIDDEN);
  let buttonText : string;
  
  const isSpoilerShowing = () : boolean => {
    return spoilerState === SpoilerState.SHOWING 
  }

  const clickHandler = () => {
    setSpoilerState(isSpoilerShowing() ? SpoilerState.HIDDEN : SpoilerState.SHOWING);
  }

  buttonText = isSpoilerShowing() ? ButtonText.HIDE : ButtonText.SHOW;

  return (
    <>
      <button onClick={clickHandler}>{buttonText}</button>
      <h2>
        {title}
      </h2>
        {isSpoilerShowing() ? <div className='spoiler__content'>{content}</div> : '' }
    </>
  )
}
