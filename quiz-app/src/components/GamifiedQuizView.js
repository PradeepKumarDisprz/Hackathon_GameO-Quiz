import './gamifiedQuizView.css';
import CarRacingView from './CarRacingView';

function GamifiedQuizView(){
    return(
        <div className='gamified-main-container'>
            <div>
                div 2
            </div>
            <div className='racing-view'>
               <CarRacingView/>
            </div>
        </div>
    )
}
export default GamifiedQuizView;
