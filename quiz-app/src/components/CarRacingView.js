import React,{useEffect,useRef,useState} from 'react';
import carImage from '../Images/carImage.jpg';
import carimage from '../Images/carimage2.jpeg';
import playGround from '../Images/playGround.jpeg';
import carLane from '../Images/car-lane.jpg';
import './carRacingView.css';
import { Canvas } from "@react-three/fiber";
import Car from './car';
import Car3D from './Car3D';

function CarRacingView(){
 const [location,setLocation]= useState(0);
 const [check,setCheck] = useState(false);
 const onLocationChange=(x)=>{
    setLocation(x)
 }
 const refFunction=(el)=>{
    if(!el) return;
                      if(el.getClientRects()[0].x === location)
                      { setCheck(true);
                      } 
 };
    return(
        <div  className='racing-view'>
            <div className='options'>
                <ul >
                    <li className='option-1'><input ref={el=>{refFunction(el)}}type='checkbox' checked={check} onChange={(e)=>console.log(e.target.value)} />A</li>
                    <li className='option-2'><input type='checkbox'/>B</li>
                    <li className='option-3'><input type='checkbox'/>C</li>
                    <li className='option-4'><input type='checkbox'/>D</li>
                </ul>
            </div>
            <div><Car location={location} onLocationChange={onLocationChange}/>
            </div>
            {console.log("race")}
            <div> <img src={carImage}  className='lane-image'  alt="React Image" /></div>
           
        </div>
    )
 
}
export default CarRacingView;