import React from 'react';
import './style.css';

import { IconContext } from 'react-icons';
import { TiMediaPlay, TiMediaPause, TiArrowRepeat, TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export default function Button(props) {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className='btn-icon'
    >
      <IconContext.Provider value={{ className: 'icon' }}>
        {
          {
            'play': <TiMediaPlay />,
            'pause': <TiMediaPause />,
            'reset': <TiArrowRepeat />,
            'up': <TiArrowSortedUp />,
            'down': <TiArrowSortedDown />,
          }[props.icon]
        }
      </IconContext.Provider>
    </button>
  );
};