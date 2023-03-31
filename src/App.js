import React from 'react'
import Timer from './components/Timer/Timer';

const App = () => {
  return (
    <div className='App'>
      <Timer focusDuration={25} breakDuration={5}/>
    </div>
  )
}

export default App
