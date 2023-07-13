
import QuizQuestion from "./QuizQuestionView/QuizQuestion"
import Control from "./Controls/ControlInstruction";
import RoadTripAnimation from "./RoadTrip/RoadTrip";
import { useState } from "react";

const QuizGame = () =>{

    const [isNextQuestion, setNextQuestion] = useState(false)

    const handleNextQuestion = () => {
        
    }

    return (
        <>
            <QuizQuestion/>
            <RoadTripAnimation/>
            <Control/>
        </>        
        )
}

export default QuizGame;