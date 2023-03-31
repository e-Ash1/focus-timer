import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import style from './timer.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import UseInterval from '../UseInterval/UseInterval';



function Timer (props) {

//Section of code determines whether the timer is within focus/break mode
const { focusDuration, breakDuration } = props;

const [currentDuration, setCurrentDuration] = useState(focusDuration * 60);
const [isOnBreak, setIsOnBreak] = useState(false);


//Create two useStates defining remainingTime and isRunning 
const[remainingTime, setRemainingTime]=useState(1500);
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

UseInterval(()=>{
  if(currentDuration>0){
    setCurrentDuration(currentDuration-1);
  }else{
    setIsOnBreak(!isOnBreak);
    setCurrentDuration(isOnBreak ? focusDuration * 60 : breakDuration * 60);
  }
})

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


  return (
    <div>
      <Display remainingTime={remainingTime} />
      <Controls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset} 
       />
    </div>
  )
}





export default Timer
