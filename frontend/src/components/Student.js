import React from 'react'
import slide1 from "../assets/slide1.jpg";
// import slide1 from "./slide1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Student = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable automatic sliding
        autoplaySpeed: 3000,
      };

  return (
    <div className='w-full h-screen  bg-gray-900 z-5'>
    <div className='max-w-screen-2xl mx-auto'>
    <Slider {...settings}>
      <div >
        <img src={slide1} alt="" className=' w-full'></img>
      </div>
      <div>
        <img src={slide1} alt="" className='w-full'></img>
      </div>
      <div>
        <img src={slide1} alt="" className='w-full'></img>
      </div>
      <div>
        <img src={slide1} alt="" className='w-full'></img>
      </div>
      <div>
        <img src={slide1} alt="" className='w-full'></img>
      </div>
      <div>
        <img src={slide1} alt="" className=' w-full'></img>
      </div>
    </Slider>
      </div>
      </div>
  )
}

export default Student