import {React} from 'react'
import slide1 from "../assets/slide1.jpg";
// import slide1 from "./slide1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './Header';
import { useState,useEffect,Link } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

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
      var eventId=1;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [render, setRender] = useState(false);

  const handlePopupOpen = (e) => {
    setCurrentEvent(e);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };
  const navigate = useNavigate();
  const openbuy = (eventId) => {
    // window.location.href = '/buy';
    console.log(eventId)
    // return <Link to={{ pathname: "/buy", state: { eventId: eventId } }} />;
    return navigate('/buy/'+eventId, { state:{ eventId: eventId }});
  };
  const [events, setEvents] = useState([]); 
  const [currentEvent, setCurrentEvent] = useState({});
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/events/display/student/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
      if(events){
        setRender(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <>
    <Header/>
    <div className='w-full h-screen  bg-gradient-to-br from-cyan-800 to-indigo-950 z-5 pt-16'>
        <div className='text-center text-white p-4 text-5xl font-bold '>Upcoming events</div>
        <div className='border-b-4 border-slate-300 mb-6 mx-32'></div>
    <div className='max-w-screen-2xl mx-auto'>
    <Slider {...settings} position='fixed'>
      <div >
        <img src={slide1} alt="" className=' w-full h-[70vh]'></img>
      </div>
      <div>
        <img src={"https://www.adobe.com/content/dam/www/us/en/events/overview-page/eventshub_evergreen_opengraph_1200x630_2x.jpg"} alt="" className='w-full h-[70vh]'></img>
      </div>
      <div>
        <img src={"https://www.pcma.org/wp-content/uploads/2018/10/trillion-main.jpg"} alt="" className='w-full h-[70vh]'></img>
      </div>
    </Slider>
      </div>
      </div>
      <div className='flex w-full bg-gradient-to-bl from-indigo-950 to-cyan-800'>
      <div className='p-8  flex flex-col pt-16' style={{width:'70%'}}>
        <div className='mb-6'>
        <h1 className='text-center text-white p-4 text-5xl font-bold border-b-4 border-slate-300 mb-4'>Events</h1>
        </div>
        <div className='flex flex-row flex-wrap gap-16 md:gap-x-48 gap-y-16 justify-center items-center '>
      
        {/* <div className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
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
        </div> */}
        {render && events.map((event, index) => (
        <div key={index} className='h-96 w-80   bg-white rounded-tr-3xl rounded-bl-3xl shadow-blue-500/50' style={{boxShadow:"8px 8px #68bafb "}}>
          <img src={event.image} className='h-64 w-80 rounded-tr-3xl'></img>    
          <p className='text-slate-900 text-3xl mt-2 font-bold'>{event.name}</p>
          <button className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-full'onClick={() => handlePopupOpen(event)}>View Details</button>
          
        </div>
      ))}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg h-auto w-96 relative">
            <h2 className='font-bold text-blue-900 text-2xl mb-2'>{currentEvent.name}</h2>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Description: <span className='text-black font-medium text-sm'>{currentEvent.desc}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Date: <span className='text-black font-medium text-sm'>{currentEvent.date}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Time: <span className='text-black font-medium text-sm'>{currentEvent.time}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Location: <span className='text-black font-medium text-sm'>{currentEvent.venue}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Committee: <span className='text-black font-medium text-sm'>{currentEvent.committee}</span></h3>
            <button onClick={handlePopupClose} className='absolute top-0 right-0 p-2'><CloseOutlinedIcon/></button>
            <button onClick={() => openbuy(currentEvent.id)} className='px-4 py-2 text-white bg-slate-900 rounded-full mt-2'>Register</button>
          </div>
        </div>
      )}
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