
import QuizQuestion from "./QuizQuestionView/QuizQuestion"
import Control from "./Controls/ControlInstruction";
import RoadTripAnimation from "./RoadTrip/RoadTrip";
import React,{ useState } from "react";
import { QUIZ_QUESTIONS } from "../Constants/QuizQuestionConstants";
import Background from "./Background/Background";
import QuizEntranceView from "./EntranceView/QuizEntranceView";
import ProgressBar from "./ProgressBar/ProgressBar"



const QuizGame = () =>{
    const [question,setQuestion] = useState(QUIZ_QUESTIONS)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [isFirstPage, setIsFirstPage] = useState(true)

    const handleQuestion = () => {
        question[questionIndex].isQuestionAttempted = true
        setQuestion(question);
        setQuestionIndex(questionIndex+1);
    }
        
    const handleFirstPage = () =>{
        setIsFirstPage(false)
    }
    return (
        <>
            <Background/>
            { isFirstPage && <QuizEntranceView handleFirstPage={handleFirstPage}/> }
            {/* {!isFirstPage && <ProgressBar/>} */}
            {!isFirstPage && <QuizQuestion question={question} questionIndex={questionIndex} handleQuestion={handleQuestion}/>}
            {!isFirstPage && <RoadTripAnimation question={question}/>}
            {!isFirstPage && <Control/>}
        </>        
        )
}

export default QuizGame;