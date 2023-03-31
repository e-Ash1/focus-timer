import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import style from './timer.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import UseInterval from '../UseInterval/UseInterval';




function Timer (props) {

//Create two useStates defining remainingTime and isRunning 
const[remainingTime, setRemainingTime]=useState();
const[isRunning, setIsRunning]=useState(false);


  //Arrow functions that set control functionality to buttons
const handleStart=()=>{
  setIsRunning(true);
};

const handlePause=()=>{
  setIsRunning(false);
};

const handleReset=()=>{
  setRemainingTime(0);
  setIsRunning(false);
};


useEffect(() =>{
  //Initilizing interValid container
  let interValid;
  //Conditional statement to determine remainingTime > 0
  if(isRunning){

    //Within interValid container, remaining time through a factor of 1 
    interValid=setInterval(() => {
      setRemainingTime(prevTime => prevTime -1);
    }, 1000);
  }
    //Return statement to reset timer
    return () => clearInterval(interValid);
}, [isRunning]);

//Section of code determines whether the timer is within focus/break mode
const { focusDuration, breakDuration } = props;

const [currentDuration, setCurrentDuration] = useState(focusDuration * 60);
const [isOnBreak, setIsOnBreak] = useState(false);


UseInterval(()=>{
  if(currentDuration>0){
    setCurrentDuration(currentDuration-1);
  }else{
    setIsOnBreak(!isOnBreak);
    setCurrentDuration(isOnBreak ? focusDuration * 60 : breakDuration * 60);
  }
})

//Section of code toggles between focus/break mode
const [time, setTime]=useState (25*60)
const [mode, setMode]=useState('focus')

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
      <Controls />
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handlePause} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset} disabled={time === currentDuration}>
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
