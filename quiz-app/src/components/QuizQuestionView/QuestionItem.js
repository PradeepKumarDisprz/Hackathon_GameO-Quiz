import'./quizQuestion.css';

const QuestionItem = ({questionItem,handleQuestion}) =>{
    return (
        <div className="quiz-question-wrapper glass-effect" onClick={handleQuestion}>
            <div className="question">{questionItem?.question}</div>
            <div className="quiz-options">
                <ol type="A">
                    {questionItem?.options.map((item, index)=>{
                        return (
                            <li className="item" key= {index}>
                                {item}
                            </li>
                        )
                    })}                     
                </ol>
            </div>
        </div>
    )
}

export default QuestionItem;

