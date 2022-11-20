import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';


export const Slider = () => {

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex,e) => {
      setIndex(selectedIndex);

    }
    return (

       
        <Carousel variant='dark' activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item style={{height:'570px'}}>
            <img
            style={{objectFit:'cover',height:'570px'}}
              className="d-block w-100"
              src="].jpeg"
              alt="First slide"
            />
          
          </Carousel.Item>
          <Carousel.Item style={{height:'570px'}}>
            <img
               style={{objectFit:'cover',height:'570px'}}
              className="d-block w-100"
              src="https://www.thespruceeats.com/thmb/0SbJp9NJa-uRitgeg1Ka9q4CPfk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dandelion-honey-recipe-1806823-hero-01-dc5e4a5a0b694704a750d7958fddf88d.jpg"
              alt="Second slide"
            />
    
            
          </Carousel.Item>
          <Carousel.Item style={{height:'570px'}}>
            <img
               style={{objectFit:'cover',height:'570px'}}
              className="d-block w-100"
              src="https://www.maeshoney.com/wp-content/uploads/2021/07/abejas-en-verano.jpg"
              alt="Third slide"
            />
    
          
          </Carousel.Item>
        </Carousel>
      )
}

