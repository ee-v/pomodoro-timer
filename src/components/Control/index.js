import React from 'react';
import Button from '@components/Button';
import './style.css';

export default function Control(props) {
  return (
    <div className='control'>
      <span id={props.idLabel} className='control-title'>{props.label}</span>
      <div className='control-section'>
        <Button id={props.idButtonOne} onClick={props.funcOne} icon={props.iconOne} />
        <span id={props.idValue} className='control-label'>{props.value}</span>
        <Button id={props.idButtonTwo} onClick={props.funcTwo} icon={props.iconTwo} />
      </div>
    </div>
  );
};