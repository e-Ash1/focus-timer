import React from 'react';
import { useState } from 'react';
import style from './timer.css';
import Display from '../Display/Display';
import UseInterval from '../UseInterval/UseInterval';




function Timer (props) {
//Section of code determines whether the timer is within focus/break mode
const { focusDuration, breakDuration } = props;

//Create two useStates defining remainingTime and isRunning 
const[isRunning, setIsRunning]=useState(false);

//Section of code toggles between focus/break mode
const [time, setTime]=useState (25*60)
const [mode, setMode]=useState('focus')

//Custom hook that reduces time every second
UseInterval(() => {
  setTime((prevSeconds) => prevSeconds - 1);
}, isRunning ? 1000 : null);

//Switch-case, in conjunction with handleReset() 
const getDefaultTime = (mode)=>{
  switch(mode){
    case 'focus':
      return 1500;
    case 'break':
      return 300;
    default:
      return 1500;
  }
}


//Start logic
const handleStart=()=>{
  setIsRunning(true);
};

//Stop logic
const handlePause=()=>{
  setIsRunning(false);
};

//Reset Logic
const handleReset=()=>{
  const defaultTime=getDefaultTime(mode);
  setTime(defaultTime);
  setIsRunning(false);
};

//Toggle switch between focus/break durations
function toggleMode(){
  if(mode==='focus'){
    setMode('break');
    setTime(breakDuration *60);
  }else{
    setMode('focus');
    setTime(focusDuration * 60);
  }
  setIsRunning(false);
}

return (
  <div className="Timer">
    <h1>{mode === 'focus' ? 'Focus' : 'Break'}</h1>
    <Display time={time} />
    <div className="Timer-controls">
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handlePause} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset} disabled={isRunning}>
        Reset
      </button>
      <button onClick={toggleMode}>
        Switch to {mode === 'focus' ? 'Break' : 'Focus'}
      </button>
    </div>
  </div>
);
}





export default Timer
