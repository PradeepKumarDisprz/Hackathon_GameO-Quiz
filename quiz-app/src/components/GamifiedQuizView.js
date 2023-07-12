import './gamifiedQuizView.css';
import CarRacingView from './CarRacingView';
import CarRacingView1 from './dummyCar';

function GamifiedQuizView(){
    return(
        <div className='gamified-main-container'>
            <div>
                div 2
            </div>
            <div className='racing-view'>
               <CarRacingView1/>
            </div>
        </div>
    )
}
export default GamifiedQuizView;
