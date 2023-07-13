import React,{useState} from 'react';
// import {CiCircleCheck } from 'react-icons/fa';
import './ProgressBar.css'

import {TiTick,TiTimes} from "react-icons/ti";

function ProgressBar() {
    const items=["Q1","Q2","Q3"]
    const [currentStep,setCurrentStep]=useState(1);
    const [isComplete,setIsComplete] = useState(false);
    const [isAnsweredCorrectly,setIsAnsweredCorrectly]=useState(false);
  return (
    <>
    <div class='progress-bar'>
      {items.map((item,i)=>(
        <div key={i} className={`step-item ${currentStep === i+1 && "active"} ${ i+1 < currentStep && "complete"} ${isAnsweredCorrectly && 'incorrect'}`}>
        <div className='step-index'>{i+1 < currentStep || isComplete ? (isAnsweredCorrectly?<TiTick />:<TiTimes/>) :  i+1 }</div>
        <div className='empty-line'><hr/></div>
        <p className='step'>{item}</p>
        </div>
      ))}
    </div>
    <button className='btn' onClick={()=>{ 
        currentStep === items.length ? setIsComplete(true):
        setCurrentStep((prev)=>prev+1)
        }}>{currentStep === items.length ? "FINISH" : "NEXT"}</button>
    </>
  );
}

export default ProgressBar;
