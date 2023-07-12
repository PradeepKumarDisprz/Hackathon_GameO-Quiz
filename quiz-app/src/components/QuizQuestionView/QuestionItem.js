
const QuestionItem = ({questionItem,handleQuestion}) =>{
    return (
        <div className="quiz-question-wrapper" onClick={handleQuestion}>
            <div className="question">{questionItem?.question}</div>
            <div className="quiz-options">
                <ul>
                    {questionItem?.options.map((item, index)=>{
                        return (
                            <li className="item" key= {index}>
                                {item}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default QuestionItem;