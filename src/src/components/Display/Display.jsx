import React from 'react';
import style from './display.css';




function Display ({ time }) {
  
  const minutes=Math.floor(time/60).toString().padStart(2, '0');
  const seconds=(time%60).toString().padStart(2,'0');
  const timeString = `${minutes}:${seconds}`;

  

  return (
    <div className='display'>
      {timeString}
    </div>
  )
}

export default Display
