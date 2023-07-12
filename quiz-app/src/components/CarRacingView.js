import React,{useEffect,useRef,useState} from 'react';
import carImage from '../Images/carImage.jpg';
import carimage from '../Images/carimage2.jpeg';
import playGround from '../Images/playGround.jpeg';
import carLane from '../Images/car-lane.jpg';
import './carRacingView.css';
import Car from './car';

function CarRacingView(){
 const initialCheckstate = [false,false,false,false]
 const [Xlocation,setXLocation]= useState(0);
 const [YLocation, setYLocation] = useState(0);
 const ids=["option1","option2","option3","option4"]
 const [check,setCheck] = useState(initialCheckstate);
 const [ref,setRef] = useState([])
 const onLocationChange=(X,Y)=>{
    setXLocation(X);
    setYLocation(Y);
    
    for(var i=0;i<4;i++)
    {
        refFunction(ref[i],i)
    }
   
 }

 function isOverlap(idOne, idTwo) {
        var objOne = document.querySelector(idOne),
            objTwo = document.querySelector(idTwo),
            offsetOne = objOne?.getBoundingClientRect(),
           
            offsetTwo = objTwo?.getBoundingClientRect(),
            topOne = offsetOne?.top,
            topTwo = offsetTwo?.top,
            leftOne = offsetOne?.left,
            leftTwo = offsetTwo?.left,
            widthOne = objOne?.offsetWidth,
            widthTwo = objTwo?.offsetWidth,
            heightOne = objOne?.offsetHeight,
            heightTwo = objTwo?.offsetHeight;
            console.log(objOne,objTwo)
        var leftTop = leftTwo > leftOne && leftTwo < leftOne + widthOne &&
                      topTwo > topOne && topTwo < topOne + heightOne,
            rightTop = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne &&
                       topTwo > topOne && topTwo < topOne + heightOne,
            leftBottom = leftTwo > leftOne && leftTwo < leftOne + widthOne &&
                         topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne,
            rightBottom = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne &&
                          topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne;
        
        return leftTop || rightTop || leftBottom || rightBottom;
      }
      

 const refFunction=(el,i)=>{
    var flag= "#"+ids[i];
    var carId="#car";
    console.log(flag,carId)
    var isOverlap1=isOverlap(flag,carId);
    console.log(isOverlap1)
    if(!el) return;
    // console.log(i)
    console.log("hi")
    // console.log(check)
    console.log(el.getClientRects()[0].x,"***",Xlocation)
    // console.log(Math.trunc (el. getClientRects()[0].x),Math.trunc(Xlocation),Math.trunc(el. getClientRects()[0].y), Math.trunc (YLocation))
                      if((el.getClientRects()[0].x === Xlocation))                       
                      { 
                        console.log("hi")
                        console.log(check)
                        // console.log(i)
                        // check[i] = true
                        setCheck(check);
                    } 
 };
 const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerWidth = 500;
  const containerHeight = 600; 

    useEffect(() => {
      const handleKeyDown = (event) => {
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
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
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
                    <li  className='option-1'><input  id="option1" ref={el=>refFunction(el,0)} type='checkbox' checked={check[0]} />A</li>
                    <li className='option-2'><input id='option2' ref={el=>refFunction(el,1)} type='checkbox' checked={check[1]}  />B</li>
                    <li className='option-3'><input id='option3' ref={el=>refFunction(el,2)} type='checkbox' checked={check[2]}  />C</li>
                    <li className='option-4'><input id='option4' ref={el=>refFunction(el,3)} type='checkbox'checked={check[3]} />D</li>
                </ul>
            </div>
            <div>
            <div  style={{
          position: 'absolute',
          left: position.x + 'px',
         top: position.y + 'px',
          transition: 'left 0.5s, top 0.5s',
          }}> <img id="car" src={carimage}  ref={el=>{
      if(!el) return;
      onLocationChange(el.getClientRects()[0].x,el.getClientRects()[0].y)
      console.log(el.getClientRects()[0])
}
} className='car-image'  alt="React Image" />
{console.log('')}</div>
            </div>
            {console.log("race")}
            <div> <img src={carImage}  className='lane-image'  alt="React Image" /></div>
           
        </div>
    )
 
}
export default CarRacingView;