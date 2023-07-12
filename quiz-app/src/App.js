import './App.scss';
import GamifiedQuizView from './Components/GamifiedQuiz/GamifiedQuizView';
import { QUIZ_QUESTIONS } from './Constants/QuizQuestionConstants';
import QuizQuestion from './Components/QuizQuestionView/QuizQuestion';
import RoadtripAnimation from './Components/RoadTrip';

function App() {
  return (
    <div className="App">
      {/* <QuizQuestion/> */}
      <RoadtripAnimation/>
      {/* <GamifiedQuizView/> */}
    </div>
  );
}

export default App;
