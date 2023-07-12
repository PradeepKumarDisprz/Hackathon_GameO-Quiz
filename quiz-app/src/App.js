import './App.css';
import CarRacingView1 from './components/dummyCar'
import { QUIZ_QUESTIONS } from './Constants/QuizQuestionConstants';
import QuizQuestion from './components/QuizQuestionView/QuizQuestion';
import RoadTrip from './components/RoadTrip';
import QuizEntranceView from './components/QuizEntranceView';
// import QuizQuestion from './Components/Qu';
// import RoadtripAnimation from './Components/RoadTrip';
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <div className="App">
       {/* <div navigation-bar><ProgressBar/></div>
       <div className='container'>
         <div className='static-container'><QuizQuestion/></div>
         <div className='game-conatiner'><CarRacingView1/></div>   
      </div> */}
      <QuizEntranceView/>
     
    </div>
  );
}

export default App;
