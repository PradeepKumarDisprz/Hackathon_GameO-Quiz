import React, { PropTypes,useState } from "react";
import './ModalPopup.css';
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";

const ModalPopup = (props) => {
   const[isOpen,setOpen]=useState(true);
//    const onClose=()=>{
//     setOpen(false);
//    }
   const getAverage= ()=>{
     return (props.totalQuestionCorrect/props.totalQuestionCount)*100;
   }
   const SuccessPopup = ()=>{
    <div>
     <div className="icon-container">
            <TiTick size={35} className="tick-symbol" />
           </div>
           <div className='text-container'>
            'Hurray! You have made it'
            </div>
            <div className="primary-close-button"><button className="close-button" onClick={()=>setOpen(false)}>close</button></div>
    </div>
   

   }
   const ErrorPopup = ()=>{
     <div>
         <div className="icon-container">
            <TiTimes size={35} className="cross-symbol" />
           </div>
           <div className='text-container'>
            'Oops! Better luck next time'
            </div>
            <div className="primary-close-button"><button className="close-button" onClick={()=>setOpen(false)}>close</button></div>   
     </div>
   }
   const CompletionPopup = () =>{
     <div className="icon-container">

     </div>
   }
   
   const popUp =()=>{
    if(props.code ==1){
        return SuccessPopup
    }
    if(props.code==2){
        return ErrorPopup
    }
    if(props.code==3)
    {
        return CompletionPopup
    }
   }  
     return(
        {isOpen}?
        <div className="popup-container">
           {/* {SuccessPopup}      */}
           <div className="icon-container-analytics">
            <TiTick size={35} className="tick-symbol" />
           </div>
           <div className="marks-container">
              <div>Total Questions = {props.totalQuestionCount}</div>
              <div>Correct Answers = {props.totalQuestionCorrect}</div>
              <div>Wrong Answer = {props.totalQuestionIncorrect}</div>
              <div>Percentage={getAverage}%</div>
           </div>
           <div className="primary-close-button"><button className="close-button" onClick={()=>setOpen(false)}>close</button></div>
        </div> : ""
     )
}


export default ModalPopup;
