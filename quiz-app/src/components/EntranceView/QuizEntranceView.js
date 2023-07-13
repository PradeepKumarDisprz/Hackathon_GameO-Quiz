import React from 'react';
import './quizEntranceView.css';
import startFlag from '../../Assets/startFlag.png'

function QuizEntranceView({handleFirstPage}) {
  return (
    <div className='quiz-first-page'>
      <img src={startFlag} alt="" />
      <button onClick={handleFirstPage} className='primary-start-button'>Start Game</button>
    </div>
  );
}

export default QuizEntranceView;
