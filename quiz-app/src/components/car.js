
import React,{useEffect,useRef,useState} from 'react';
import carImage from '../Images/carimage2.jpeg';

export default function Car(props) {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const carRef= useRef();
  const containerWidth = 500; // Adjust the container width as needed
  const containerHeight = 600; // Adjust the container height as needed

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
  
  return (
    <div style={{
      position: 'absolute',
      left: position.x + 'px',
      top: position.y + 'px',
      transition: 'left 0.5s, top 0.5s', // Add a smooth transition effect
       // Customize the car appearance
}}> <img src={carImage}  ref={el=>{
 if(!el) return;
 props.onLocationChange(el.getClientRects()[0].x)
 console.log(el.getClientRects()[0].x)
}
} className='car-image' alt="React Image" />
{console.log('')}</div>
  );
}
