import React from 'react'
import { useEffect, useRef } from 'react';

//Stores reference of callback function, in between re-renders of DOM
function UseInterval (callback,delay){
    const savedCallBack=useRef();

    //Stores the callback within savedCallBack variable
    useEffect(()=>{
      savedCallBack.current=callback;
    }, [callback]);

    //Establishes 1 second delay per refresh to update DOM with new value; meanwhile, holding the same callback reference
    useEffect(()=>{
      function tick(){
        savedCallBack.current();

    }


    //If the timer expires, resets the timer
    if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
  },[delay]);

  
}

    

export default UseInterval;
