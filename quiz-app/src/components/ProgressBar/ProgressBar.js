import React,{useState} from 'react';
// import {CiCircleCheck } from 'react-icons/fa';
import './ProgressBar.css';
import { QUIZ_QUESTIONS } from '../../Constants/QuizQuestionConstants';
import { AiOutlineTrophy } from "react-icons/ai";
import {TiTick,TiTimes} from "react-icons/ti";

function ProgressBar() {
    const items=["Q1","Q2","Q3"]
    const [currentStep,setCurrentStep]=useState(1);
    const [isComplete,setIsComplete] = useState(false);
    const [isAnsweredCorrectly,setIsAnsweredCorrectly]=useState(true);
  return (
    <>
    <div class='progress-bar'>
      {QUIZ_QUESTIONS.map((item,i)=>(
        <div key={i} className={`step-item ${currentStep === i+1 && "active"} ${ (i+1 < currentStep || isComplete) && "complete"} ${isAnsweredCorrectly && 'incorrect'}`}>
        <div className='step-index'>{i+1 < currentStep || isComplete ? (isAnsweredCorrectly?<AiOutlineTrophy />:<TiTimes/>) :  i+1 }</div>
        {/* <div className='empty-line'><hr/></div> */}
        {/* <p className='step'>{item}</p> */}
        </div>
      ))}
    </div>
    {/* <div className='button-container'><button className='btn' onClick={()=>{ 
        currentStep === QUIZ_QUESTIONS.length ? setIsComplete(true):
        setCurrentStep((prev)=>prev+1)
        }}>{currentStep === QUIZ_QUESTIONS.length ? "FINISH" : "NEXT"}</button></div> */}
    </>
  );
}

export default ProgressBar;
