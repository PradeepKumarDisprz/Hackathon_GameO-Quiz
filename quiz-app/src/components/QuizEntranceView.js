import React from 'react';
import './quizEntranceView.css';
import movingCar from '../Images/movingCar.jpg'

function QuizEntranceView() {
  return (
    <div className='quiz-first-page'>
      <div className='instructions-container'></div>
      <div className='moving-car'>
        <img src={movingCar} className='animated-car' alt="React Image" />
      </div>
      <div className='primary-start-button'><button >Let's RACE</button></div>
    </div>
  );
}

export default QuizEntranceView;
