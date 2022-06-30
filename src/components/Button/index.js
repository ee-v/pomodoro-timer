import React from 'react';
import './style.css';

const PlayIcon = document.getElementById('playIcon');
export default function Button(props) {
  let style = {
    maskImage: `url(${props.icon})`,
    WebkitMaskImage: `url(${props.icon})`
  };
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className='btn-icon'
      style={style}>
    </button>
  );
};