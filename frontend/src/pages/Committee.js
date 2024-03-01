import React, { useEffect, useState, useContext } from "react";
import AuthContext from '../context/AuthContext';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Committee() {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupOpen2 = () => {
    setIsPopupOpen2(true);
  };
  const handlePopupClose2 = () => {
    setIsPopupOpen2(false);
  };

  function handleFile(e) {
    setName(e.target.files[0]);
  }

  function handleProgress(e) {
    setCurrentEvent(e);
    handlePopupOpen2();
  }

  const createEvent = async () => {
    try {
      setLoading(true);
      navigate('/venue', { state: {name: name, type: type, date: date, time: time, desc: desc, image: img, committee: user.name } } );
      // let res = await axios.post('http://127.0.0.1:8000/events/',
      // { name: name, type: type, date: date, time: time, desc: desc, image: img, committee: user.name, venue: "djs" }, 
      // { headers: { 'Content-Type': 'application/json'}})
      // console.log(res);
      setLoading(false);
      setRender(false);
      setRender(true);
      handlePopupClose();
      setTimeout(() => {
        getEventData();
      }, 300)
    } catch (error) {
      console.error(error)
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    createEvent();
    // console.log("form submitted");
    // window.location.href = '/venue';
  }

  let [committeeEventData, setCommitteeEventData] = useState([]);


  const getEventData = async () => {
    try {
      setCommitteeEventData([])
      let res = await axios.get('http://127.0.0.1:8000/events/display/', { headers: { 'Content-Type': 'application/json' } });
      let eventData = await res.data;
      console.log(eventData); // Check the retrieved data
      let dummyData = [];
      eventData.map((e) => {
        if (e.committee === user.username) {
          if(!dummyData.includes(e))
            dummyData.push(e);
        }
        setCommitteeEventData(dummyData)
      });
      if (committeeEventData != null) setRender(true);
      console.log(committeeEventData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);
  
  return (
    <div className="h-max">
      <Header />
      <div className="relative top-12 bg-gradient-to-br from-cyan-800 to-indigo-950 h-max pt-4">
        <div className="max-w-[1300px] mx-auto flex justify-end text-white mt-8 relative">
          <div
            className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-green-700 hover:bg-green-800"
            onClick={() => handlePopupOpen()}
          >
            Create New Event <AddIcon />
          </div>
          <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-yellow-600 hover:bg-yellow-700">
            View All Events <RemoveRedEyeIcon className="pl-1" />
          </div>
        </div>
        {isPopupOpen && (
          <div className="space-y-6 w-2/6 mx-auto bg-slate-600 p-8 rounded-3xl fixed top-[10rem] left-1/3 shadow-2xl">
            {loading? <div className="font-bold text-yellow-300">Creating Event...</div> : <div>
            <div
              className="text-red-400 font-bold text-right"
              onClick={handlePopupClose}
            >
              <button>X</button>
            </div>
            <h3 className="text-xl font-medium text-white text-center">
              Fill up the Event Details
            </h3>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between mb-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="eventName"
                      className="block font-normal text-slate-200 mb-0.5 pl-1"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="eventName"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="p-1 pl-2 pr-2 rounded-lg w-11/12 focus:outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="eventType"
                      className="block font-normal text-slate-200 mb-0.5 pl-1"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      onChange={(e) => setType(e.target.value)}
                      required
                      className="p-1 text-md pb-0.5 pl-2 pr-2 rounded-lg w-full focus:outline-none"
                    >
                      <option value="Select" selected disabled>Select</option>
                      <option value="education">Education</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="eventDesc"
                    className="block font-normal text-slate-200 mb-0.5 pl-1"
                  >
                    Event Description
                  </label>
                  <input
                    type="text"
                    id="eventDesc"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    className="p-1 pl-2 pr-2 rounded-lg w-full focus:outline-none"
                  />
                </div>
                <div className="flex justify-between mb-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="eventDate"
                      className="block font-normal text-slate-200 mb-0.5 pl-1"
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="p-1 text-md pb-0.5 pl-2 pr-2 rounded-lg w-full focus:outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="eventTime"
                      className="block font-normal text-slate-200 mb-0.5 pl-1"
                    >
                      Event Time
                    </label>
                    <input
                      type="time"
                      id="eventTime"
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="p-1 pl-2 pr-2 rounded-lg w-11/12 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-8">
                  <div className="w-full">
                    <label
                      htmlFor="eventImg"
                      className="block font-normal text-slate-200 mb-0.5 pl-1"
                    >
                      Image
                    </label>
                    <input
                      type="text"
                      id="eventImg"
                      placeholder="Paste URL of the image"
                      onChange={(e) => setImg(e.target.value)}
                      required
                      className="p-1 pl-2 pr-2 rounded-lg w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    value="Check available Venue"
                    className="bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer p-1 w-full rounded-2xl"
                  />
                </div>
              </form>
            </div>
            </div>}
          </div>
        )}
        {isPopupOpen2 && (
          <div className="space-y-6 w-3/6 mx-auto bg-slate-600 p-8 rounded-3xl fixed top-[10rem] left-1/4 shadow-2xl">
            <div
              className="text-red-400 font-bold text-right"
              onClick={handlePopupClose2}
            >
              <button>X</button>
            </div>
            <ol class="flex items-center w-full text-sm font-medium text-center text-gray-100 sm:text-base">
              <li class="flex md:w-full items-center text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b  after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 after:border-gray-700">
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-500">
                {(!currentEvent.is_approved  && !currentEvent.is_rejected )? "" : <CheckCircleIcon/>}
                  <span class="hidden sm:inline-flex sm:ms-2">{(!currentEvent.is_approved  && !currentEvent.is_rejected )? "Pending" : "Passed Forward"}</span>
                </span>
              </li>
              <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-500">
                {!currentEvent.is_approved? (!currentEvent.is_rejected? "" : <CancelIcon/>) : <CheckCircleIcon/>}
                  <span class="hidden sm:inline-flex sm:ms-2">
                  {!currentEvent.is_approved? (!currentEvent.is_rejected? "Pending" : "Rejected") : "Approved"}
                  </span>
                </span>
              </li>
              <li class="flex items-center">
                <span class="me-2">{!currentEvent.is_approved? (!currentEvent.is_rejected? "Pending" : "-") : currentEvent.date}</span>
              </li>
            </ol>
          </div>
        )}
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Pending Events</h1>
        </div>
        <div className="max-w-[1300px] m-auto pt-10 flex flex-wrap justify-around">
          {render &&
            committeeEventData.map((e) => {
              if(e.is_approved === false && e.is_rejected === false){
              return (
                <div
                  key={e.id}
                  class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-black mb-8"
                >
                  <img class="w-full" src={e.image} alt="" />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2 text-white">
                      {e.name}
                    </div>
                    <p class="text-gray-300 text-base">{e.desc}</p>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <div className="flex">
                      <span class="rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                        <LocationOnIcon />Room {e.venue}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span class="rounded-full pl-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                          <AccessTimeIcon className="mr-0.5" />
                          {e.date}
                        </span>
                        <span class="inline-block rounded-full  py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
                          <FiberManualRecordIcon sx={{ fontSize: 4 }} />{" "}
                          {e.time}
                        </span>
                      </div>
                      <div>
                        <Link
                          to=""
                          className="text-sm  text-blue-400 underline"
                          onClick={() => handleProgress(e)}
                        >
                          Approval Status{" "}
                          <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
              }
            })}
        </div>
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Approved Events</h1>
        </div>
        <div className="max-w-[1300px] m-auto pt-10 flex flex-wrap justify-around">
          {render &&
            committeeEventData.map((e) => {
              if(e.is_approved === true && e.is_rejected === false){
              return (
                <div
                  key={e.id}
                  class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-black mb-8"
                >
                  <img class="w-full" src={e.image} alt="" />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2 text-white">
                      {e.name}
                    </div>
                    <p class="text-gray-300 text-base">{e.desc}</p>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <div className="flex">
                      <span class="rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                        <LocationOnIcon /> Room {e.venue}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span class="rounded-full pl-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                          <AccessTimeIcon className="mr-0.5" />
                          {e.date}
                        </span>
                        <span class="inline-block rounded-full  py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
                          <FiberManualRecordIcon sx={{ fontSize: 4 }} />{" "}
                          {e.time}
                        </span>
                      </div>
                      <div>
                        <Link
                          to=""
                          className="text-sm  text-blue-400 underline"
                          onClick={() => handleProgress(e)}
                        >
                          Approval Status{" "}
                          <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
              }
            })}
        </div>
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Rejected Events</h1>
        </div>
        <div className="max-w-[1300px] m-auto pt-10 flex flex-wrap justify-around">
          {render &&
            committeeEventData.map((e) => {
              console.log(e.name)
              if(e.is_approved === false && e.is_rejected === true){
                console.log(e.name)
              return (
                <div
                  key={e.id}
                  class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-black mb-8"
                >
                  <img class="w-full" src={e.image} alt="" />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2 text-white">
                      {e.name}
                    </div>
                    <p class="text-gray-300 text-base">{e.desc}</p>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <div className="flex">
                      <span class="rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                        <LocationOnIcon /> Room {e.venue}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span class="rounded-full pl-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 flex items-center">
                          <AccessTimeIcon className="mr-0.5" />
                          {e.date}
                        </span>
                        <span class="inline-block rounded-full  py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
                          <FiberManualRecordIcon sx={{ fontSize: 4 }} />{" "}
                          {e.time}
                        </span>
                      </div>
                      <div>
                        <Link
                          to=""
                          className="text-sm  text-blue-400 underline"
                          onClick={() => handleProgress(e)}
                        >
                          Approval Status{" "}
                          <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default Committee;
