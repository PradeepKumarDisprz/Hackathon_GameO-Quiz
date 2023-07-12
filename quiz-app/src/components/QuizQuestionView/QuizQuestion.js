import React,{useState} from "react";
import { QUIZ_QUESTIONS } from "../../Constants/QuizQuestionConstants";
import QuestionItem from "./QuestionItem";
const QuizQuestion = ()=>{

    const [question,setQuestion] = useState(QUIZ_QUESTIONS)
    const [questionIndex, setQuestionIndex] = useState(0)

    const handleQuestion = () => {
        question[questionIndex].isQuestionAttempted = true
        setQuestion(question);
        setQuestionIndex(questionIndex+1);
    }

    const toRender = questionIndex >= question.length ? <div>Hello</div> : <QuestionItem questionItem={question[questionIndex]} handleQuestion={handleQuestion}/>

    return toRender
}
export default QuizQuestion;