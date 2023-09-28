import React from 'react';
import './App.css';

function App() {

  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [label, setLabel] = React.useState("Session");

  const [time, setTime] = React.useState(`${sessionLength}:00`);
  const [isActive, setIsActive] = React.useState(false);
  const audioRef = React.createRef();
  const reset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime=0;
    setIsActive(false); 
    setLabel("Session");
    setBreakLength(5);
    setSessionLength(25);
    setTime(`25:00`); 
  };

  const timeLeft = () => {
 
    // console.log("hello");
    
    const sessionInterval = setInterval(() => {
      setTime((prevTime) => {
        let newMinute = prevTime.split(":")[0];
        let newSecond = prevTime.split(":")[1];
        
        if (newSecond === "00") {
          if (newMinute === "00") {
           audioRef.current.play();
            clearInterval(sessionInterval);
            if(label==="Session"){
              setLabel("Break");
              return `${breakLength}:00` // Stop the timer when it reaches 00:00
            }
            else{
              setLabel("Session");
              return `${sessionLength}:00`
            }
          } else {
            newMinute = String(parseInt(newMinute) - 1).padStart(2, "0");
            newSecond = "59";
          }
        } else {
          newSecond = String(parseInt(newSecond) - 1).padStart(2, "0");
        }
  
        return `${newMinute}:${newSecond}`;
      });
    }, 1000);
    console.log(time);
    return () => clearInterval(sessionInterval);

 

 
  }

  React.useEffect(() => {
    if (isActive) {
      return timeLeft();
    }
   
  }, [time,sessionLength,isActive]
  );


  const incrementBreak = () =>{
    setBreakLength(breakLength<60? breakLength + 1: 60);
    
  }
  const decrementBreak = () =>{
    setBreakLength(breakLength >1 ? breakLength - 1 : 1);
  }

  const incrementSession = () =>{
    if(!isActive){
      setSessionLength(sessionLength <60? sessionLength + 1: 60);
  if(time===`${sessionLength}:00`){
    setTime(`${sessionLength <60? sessionLength + 1: 60}:00`)
  }
     
    }
  
  }
  const decrementSession = () =>{
    if(!isActive){
      setSessionLength(sessionLength > 1 ? sessionLength - 1 : 1);
      if(time === `${sessionLength}:00`){
        setTime(`${sessionLength > 1 ? sessionLength - 1 : 1}:00`);

      }
    }


  }

  return (

    <div className="App">

     <h2>25 + 5 Clock</h2>

     <div className="length">

      <div className="break">
        <h4 id='break-label'>Break Length</h4>
        <button id="break-increment" onClick = {()=> incrementBreak()}><i className="fa-solid fa-caret-up"></i></button>
        <h5 id='break-length'>{breakLength}</h5>
        <button id="break-decrement" onClick={() => decrementBreak()}><i className="fa-solid fa-caret-down"></i>
</button>
      
      </div>

      <div className="session">
      <h4 id='session-label'>Session Length</h4>
      <button id="session-increment" onClick={()=> incrementSession()}><i className="fa-solid fa-caret-up"></i></button>
      <h5 id='session-length'>{sessionLength}</h5>
      <button id="session-decrement" onClick = {()=> decrementSession()}><i className="fa-solid fa-caret-down"></i>
</button>
     
      </div>

     </div>

     <div className="time">
      <h3 id='timer-label'  className={time.split(":")[0] === "00"? "time-left": ""} >{label}</h3>
      <h1 id='time-left' className={time.split(":")[0] === "00"? "time-left": ""}>{time}</h1>
     </div>

     <button id="start_stop" onClick={()=> {setIsActive(!isActive); console.log(isActive);}}><i className="fa-solid fa-play"></i><i className="fa-solid fa-pause"></i></button>
      <button id="reset" onClick={() => reset()}><i className="fa-solid fa-arrows-rotate"></i></button>
      <audio id="beep"  ref={audioRef} preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;
