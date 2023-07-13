import React from "react";
import QuestionItem from "./QuestionItem";

const QuizQuestion = (props)=>{

    const {question, questionIndex, handleQuestion} = props

    const toRender = questionIndex >= question.length ? 
                                    <div>Popup</div> 
                                    : <QuestionItem questionItem={question[questionIndex]} handleQuestion={handleQuestion}/>

    return toRender
}
export default QuizQuestion;