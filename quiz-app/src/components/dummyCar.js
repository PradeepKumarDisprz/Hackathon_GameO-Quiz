import React,{useEffect,useRef,useState} from 'react';
import carImage from '../Images/carImage.jpg';
import carimage from '../Images/carimage2.jpeg';
import playGround from '../Images/playGround.jpeg';
import carLane from '../Images/car-lane.jpg';
import './carRacingView.css';
import { Canvas } from "@react-three/fiber";
import Car from './car';
import Car3D from './Car3D';
var x,y;
function CarRacingView1(){
 var answers=[];

 var initialCheckstate = [false,false,false,false]
 const [check,setCheck] = useState(initialCheckstate);
 const [answer,setAnswer] = useState([]);
 const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);
  const element4Ref = useRef(null);
  const element5Ref = useRef(null);
//   const [collision, setCollision] = useState(false);

  useEffect(() => {
    const element1 = element1Ref.current;
    const element2 = element2Ref.current;
    const element3 = element3Ref.current;
    const element4 = element4Ref.current;
    const element5 = element5Ref.current;
    if (element1 && element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect(); 
      checkColliding(rect1,rect2,0)
    }
    if(element1 && element3)
    {
       const rect1 = element1.getBoundingClientRect();
       const rect2 = element3.getBoundingClientRect(); 
       checkColliding(rect1,rect2,1)
    }
    if(element1 && element4)
    {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element4.getBoundingClientRect(); 
        checkColliding(rect1,rect2,2)
    }
    if(element1 && element5)
    {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element5.getBoundingClientRect(); 
        checkColliding(rect1,rect2,3)
    }

  });

  const checkColliding=(rect1,rect2,i)=>{
    const isColliding = rect1.left < rect2.right && rect1.right > rect2.left &&
        rect1.top < rect2.bottom && rect1.bottom > rect2.top;
        // setCollision(isColliding);
        if(isColliding){
                check[i]=true;
                setCheck(check)
                answers.push(i);
        }
  }

  const onCompletion=()=>{
    console.log("answers",answers);
      setAnswer(answers);
      console.log(answer)
  }

 const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerWidth = 500;
  const containerHeight = 600; 

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            if (event.key === 'ArrowLeft') {
              moveLeft();
            } else if (event.key === 'ArrowRight') {
              moveRight();
            } else if (event.key === 'ArrowUp') {
              moveUp();
            } else if (event.key === 'ArrowDown') {
              moveDown();
            }
          };
        
          window.addEventListener('keydown', handleKeyDownEvent);
        
          return () => {
            window.removeEventListener('keydown', handleKeyDownEvent);
          };
    }, []);
  
    const moveLeft = () => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: Math.max(prevPosition.x - 10, 0),
      }));
    };
  
    const moveRight = () => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: Math.min(prevPosition.x + 10, containerWidth - 100), // Subtract the car width from the container width
      }));
    };
  
    const moveUp = () => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: Math.max(prevPosition.y - 10, 0),
      }));
    };
  
    const moveDown = () => {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: Math.min(prevPosition.y + 10, containerHeight - 50), // Subtract the car height from the container height
      }));
    };
  
    return(
        <div  className='racing-view'>
            <div className='options'>
                <ul >
                    <li  className='option-1'><input id="option1" ref={element2Ref} type='checkbox' checked={check[0]} />A</li>
                    <li className='option-2'><input id='option2' ref={element3Ref} type='checkbox' checked={check[1]}  />B</li>
                    <li className='option-3'><input id='option3' ref={element4Ref} type='checkbox' checked={check[2]} />C</li>
                    <li className='option-4'><input id='option4' ref={element5Ref} type='checkbox'checked={check[3]} />D</li>
                </ul>
            </div>
            <div>
            <div  style={{
                   position: 'absolute',
                   left: position.x + 'px',
                   top: position.y + 'px',
                   transition: 'left 0.5s, top 0.5s',
          }}> <img id="car" src={carimage}  ref={element1Ref} className='car-image'  alt="React Image" /></div>
            </div>
            <audio id="audio" loop autoplay> 
             {/* <source src="%PUBLIC_URL%/carSound.mp3" type="audio/mpeg"/> */}
            </audio>
            <div> <img src={carImage}  className='lane-image'  alt="React Image" /></div>
            <div className='buttons-container'><button onClick={()=>setCheck([...initialCheckstate])}>Reset</button><button type='button' onClick={()=>onCompletion()}>Submit</button></div>
        </div>
    )
 
}
export default CarRacingView1;