import React from 'react';
import './style.css';

export default function Display(props) {
  const [mm, ss] = props.value;
  const format = (n) => n < 10 ? '0' + n : n;
  return (
    <div className='display'>
      <h2 className='display-title' id={props.idLabel}>{props.label}</h2>
      <span className='display-value' id={props.idValue}>{`${format(mm)}:${format(ss)}`}</span>
    </div>
  );
};