import React, { useState, useEffect } from 'react';
import carLane from '../Images/car-lane.jpg';


const Car3D = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '200px', // Adjust the height of the road as needed
            backgroundColor: 'gray', // Customize the road color
            animation: 'moveRoad 5s linear infinite', // Adjust the animation duration and timing as needed
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '-50px', // Adjust the vertical position of the car relative to the road
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px', // Adjust the size of the car element
            height: '50px',
            backgroundColor: 'red', // Customize the car color
          }}
        ></div>
      </div>
    </div>
  );
};

export default Car3D;
