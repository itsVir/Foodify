// Your existing component
import React from 'react';
import VismeEmbed from './VismeEmbed';  // Adjust the path based on your project structure
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className='menu' style={{ }}>
      {/* <VismeEmbed /> */}
      <h1>Foodify</h1>
      <h2>Get Fresh Food At Your Door Step</h2>

        {/* <div className="overlay">
          POWER BY FOODIFY
        </div> */}
      </div>
    </>
  );
}

export default Hero;
