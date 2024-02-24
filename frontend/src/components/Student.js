import {React} from 'react'
import slide1 from "../assets/slide1.jpg";
// import slide1 from "./slide1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './Header';
import { useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  return (
    <>
    <Header/>
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
      <div className='flex w-full bg-slate-900'>
      <div className='p-8  flex flex-col pt-16' style={{width:'70%'}}>
        <div className='mb-6'>
        <h1 className='text-center text-white p-4 text-5xl font-bold'>Events</h1>
        </div>
        <div className='flex flex-row flex-wrap gap-16 md:gap-x-48 gap-y-16 justify-center items-center '>
      
        <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
            <img src={slide1} className='h-64 w-80 rounded-tr-3xl'></img>    
            <p className='text-slate-900 text-3xl mt-2 font-bold'>Hackniche 2.0</p>
            <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'  onClick={handlePopupOpen}>View Details</button>
        {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg h-auto w-96 relative">
            <h2 className='font-bold text-blue-900 text-2xl mb-2'>Event Name</h2>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Description: <span className='text-black font-medium text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, necessitatibus.</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Date: <span className='text-black font-medium text-sm'>25-02-2024</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Time: <span className='text-black font-medium text-sm'>10.30am onwards</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Location: <span className='text-black font-medium text-sm'>BJ Hall</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Committee: <span className='text-black font-medium text-sm'>DJS Trinity</span></h3>
            <button onClick={handlePopupClose} className='absolute top-0 right-0 p-2'><CloseOutlinedIcon/></button>
            <button className='px-4 py-2 text-white bg-slate-900 rounded-full mt-2'>Register</button>
          </div>
        </div>
      )}
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
        <div className=' m-32 h-96 bg-white rounded-2xl mx-4' style={{width:'30%'}}>
          <div className='h-16 bg-red-500 rounded-tl-2xl rounded-tr-2xl flex justify-center items-center text-white font-bold text-2xl'>
          <NotificationsIcon/>&nbsp;Notifications
          </div>
          <div>
          <div className='mt-4'>LOC 5.0 coming soon!</div>
          <div className='border-b-2 border-gray-200 p-2 '></div>
          </div>
          <div>
          <div className='mt-4'>LOC 5.0 coming soon!</div>
          <div className='border-b-2 border-gray-200 p-2 '></div>
          </div>
          <div>
          <div className='mt-4'>LOC 5.0 coming soon!</div>
          <div className='border-b-2 border-gray-200 p-2 '></div>
          </div>
          </div>
    </div>

      </>
  )
}

export default Student