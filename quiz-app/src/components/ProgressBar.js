import React,{useState} from 'react';
// import {CiCircleCheck } from 'react-icons/fa';
import './ProgressBar.css'

import {TiTick} from "react-icons/ti";

function ProgressBar() {
    const items=["Q1","Q2","Q3"]
    const [currentStep,setCurrentStep]=useState(0);
    const [isComplete,setIsComplete] = useState(false);
  return (
    <>
    <div class='progress-bar'>
      {items.map((item,i)=>(
        <div key={i} className={`step-item ${currentStep === i+1 && "active"} ${ i+1 < currentStep && "complete"} ${i+1 > currentStep && 'incorrect'}`}>
        <div className='step-index'>{i+1 < currentStep || isComplete ? <TiTick /> :  i+1 }</div>
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
