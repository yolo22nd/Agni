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
    <>
    <div className='w-full h-screen  bg-gray-900 z-5 pt-16'>
        <h1 className='text-center text-white p-4 text-5xl font-bold'>Upcoming events</h1>
    <div className='max-w-screen-2xl mx-auto'>
    <Slider {...settings} position='fixed'>
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
      <div className='p-8 bg-slate-900 flex flex-col pt-16'>
        <div className='mb-6'>
        <h1 className='text-center text-white p-4 text-5xl font-bold'>Upcoming events</h1>
        </div>
        <div className='flex flex-row flex-wrap gap-16 md:gap-x-64 gap-y-16 justify-center align-center '>
      
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'>View Details</button>
        </div>
              
        </div>
    </div>

      </>
  )
}

export default Student