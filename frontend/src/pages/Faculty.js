import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from 'axios';


function Faculty() {
  const [render, setRender] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pendingEvents,setPendingEvents] = useState([]);
  const [previousEvents,setPreviousEvents] = useState([]);
  const {user} = useContext(AuthContext)
  

//   let getPendingEvents = async()=>{
//     let fac_id=user.fac_id
//     console.log("fetching response")
//     let response = await fetch('http://127.0.0.1:8000/events/display/student/pending/', {
//           method:'POST',
//           headers:{
//             'Content-Type':'application/json',
//             // 'Authorization':'Bearer '+String(authTokens.access),
//           },
//           body:JSON.stringify({fac_id})     
//     })  
//         console.log("response fetched")
//     let data = await response.json()
//     console.log("data set")
//     console.log(data)
//     if (response.status === 200) {
//       setPendingEvents(data.event_list);
//       console.log('events set')
//   }
  
// }



  const handlePopup = (e) => {
      setCurrentEvent(e);
      setIsPopupOpen(true);
  };

  const getPendingEvents = async () => {
    try {
        let res = await axios.post('http://127.0.0.1:8000/events/display/student/pending/', { fac_id: user.fac_id }, { headers: { 'Content-Type': 'application/json' } });
        let eventData = await res.data;
        console.log(eventData.booking_list);
        setPendingEvents(eventData.booking_list);  // Set pendingEvents to eventData.booking_list
        if(pendingEvents)
        {
            setRender(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    
    const getPreviousEvents = async () => {
      try {
        let res = await axios.get('http://127.0.0.1:8000/booking/display/', { headers: { 'Content-Type': 'application/json' } });
        let eventData = await res.data;
        console.log(eventData);
        setPreviousEvents(eventData.booking_list);
        if(previousEvents)
        {
            setRender(true);
        }
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    // setRender(true);
    getPendingEvents();
    getPreviousEvents();
  }, []);



//   let getEvents = async()=>{
//     console.log("fetching response")
//     let response = await fetch('http://127.0.0.1:8000/events/display/student/previous/', {
//           method:'GET',
//           headers:{
//             'Content-Type':'application/json',
//             // 'Authorization':'Bearer '+String(authTokens.access),
//           }
//     })
//         console.log("response fetched")
//     let data = await response.json()
//     console.log("data set")
//     console.log(data)
//     if (response.status === 200) {
//       setEvents(data);
//       console.log('events set')
//   } 
//   // else if (response.statusText === 'Unauthorized'){
//   //   logOutUser()
//   // }  
// }


async function approveAll() {
  let a = document.getElementById("approveAll").checked;
  if (a) {
      let b = window.confirm(
          "Are you sure you want to approve all the pending requests?"
      );
      if (b === true) {
          try {
              for (let ev of pendingEvents) {
                  let response = await axios.post('http://127.0.0.1:8000/approve/', {
                      fac_id: user.fac_id,
                      event_name: ev.name
                  }, {
                      headers:{
                          'Content-Type':'application/json',
                      }
                  });
                  console.log("response fetched")
                  let data = await response.data
                  console.log(response)
                  console.log(data)
              }
              alert("All requests accepted")
          } catch (e) {
              console.log(e);
          }
      }
      else{
          document.getElementById("approveAll").checked = false;
      }
  }
}


  let approve = async(e)=>{
    console.log("fetching response")
    let response = await axios.post('http://127.0.0.1:8000/approve/', {
        fac_id: user.fac_id,
        event_name: e.name
    }, {
        headers:{
            'Content-Type':'application/json',
        }
    })
    console.log("response fetched")
    let data = await response.data
    console.log(response)
    console.log(data)
}

  function handleAccept(e) {
    // try {
    //   let pass = prompt("Enter password to proceed");
    //   if (pass === "Hello") {
    //     alert("Request Accepted");
    //   } else {
    //     alert("Wrong password. Request still pending");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    approve(e)

  
  }

async function handleReject(e) {
    try {
        let pass = prompt("Enter password to proceed");
        let response = await axios.post('http://127.0.0.1:8000/reject/', {
            fac_id: user.fac_id,
            event_name: e.name,
            password: pass
        }, {
            headers:{
                'Content-Type':'application/json',
            }
        });
        if (response.status === 200) {
            alert("Request Rejected");
        } else {
            alert("Wrong password. Request still pending");
        }
    } catch (error) {
        console.error(error);
    }
}


  // let events = [
  //   {
  //     _id: 123456,
  //     name: "DJS Trinity",
  //     committee: "unicode",
  //     booking: {},
  //     venue: "djs",
  //     regi_members: [],
  //     type: "",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
  //     date: "25-02-2024",
  //     time: "19:20",
  //     image:
  //       "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
  //   },
  // ];
  return (
    <div className="h-max">
      <Header />
      <div className="relative top-12 bg-gradient-to-br from-cyan-800 to-indigo-950 h-max pt-4 pb-5">
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Pending Requests</h1>
        </div>
        <div className="mt-8">
          <div className="mb-8 text-right max-w-[1500px]">
            <input
              type="checkbox"
              name=""
              id="approveAll"
              className="mr-2 w-5"
              onClick={() => approveAll()}
            />
            <label
              htmlFor="approveAll"
              className="text-sky-100 font-semibold text-xl"
            >
              Approve All
            </label>
          </div>
          {render &&
            pendingEvents.map((e) => {
              return (
                <div
                  key={e.name}
                  className="w-[1100px] h-40 bg-slate-500 m-auto rounded-3xl p-2 pl-3 pr-3 mb-5"
                >
                  <div className="flex justify-between h-full">
                    <div className="h-full flex">
                      <div className="flex items-center h-full">
                        <img src={e.image} alt="" className="w-56 ml-5 h-32" />
                      </div>
                      <div className="pl-3 pt-2">
                        <div className="text-white text-left font-bold text-4xl">
                          {e.name}
                        </div>
                        <div className="flex pt-14">
                          <div className="text-slate-100 text-left font-medium">
                            Venue:{" "}
                            <span className="font-normal text-md">
                              Room {e.venue}
                            </span>
                          </div>
                          <div className="text-slate-100 text-left font-medium ml-5">
                            Date:{" "}
                            <span className="font-normal text-md">
                              {e.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="h-5/6 my-auto flex items-end ml-10">
                        <span className="pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500" onClick={() => {handlePopup(e)}}>
                          View More
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-around h-full mr-5">
                      <div
                        className="flex text-white items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-green-500 hover:bg-green-600"
                        onClick={() => handleAccept(e)}
                      >
                        Accept <DoneIcon />
                      </div>
                      <div
                        className="flex text-white items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-red-600 hover:bg-red-700"
                        onClick={() => handleReject(e)}
                      >
                        Reject <CloseIcon />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-20 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Previous Requests</h1>
        </div>
        <div className="mt-8">
          {render &&
            previousEvents?.map((e) => {
              return (
                <div
                  key={e.name}
                  className="w-[1100px] h-40 bg-slate-500 m-auto rounded-3xl p-2 pl-3 pr-3 mt-5"
                >
                  <div className="flex justify-between h-full">
                    <div className="h-full flex">
                      <div className="flex items-center h-full">
                        <img src={e.image} alt="" className="w-56 ml-5 h-32" />
                      </div>
                      <div className="pl-3 pt-2">
                        <div className="text-white text-left font-bold text-4xl">
                          {e.name}
                        </div>
                        <div className="flex pt-14">
                          <div className="text-slate-100 text-left font-medium">
                            Venue:{" "}
                            <span className="font-normal text-md">
                              Room {e.venue}
                            </span>
                          </div>
                          <div className="text-slate-100 text-left font-medium ml-5">
                            Date:{" "}
                            <span className="font-normal text-md">
                              {e.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="h-5/6 my-auto flex items-end ml-10">
                        <span className="pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500" onClick={() => handlePopup(e)}>
                          View More
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-around h-full mr-5">
                  {!e.is_approved &&    <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 text-green-500">
                        Accepted <DoneIcon />
                      </div>
          }
          {!e.is_approved &&
                      <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 text-red-600">
                        Rejected <CloseIcon />
                      </div>
            }
            {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg h-auto w-96 relative">
            <h2 className='font-bold text-blue-900 text-2xl mb-2'>{currentEvent.name}</h2>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Description: <span className='text-black font-medium text-sm'>{currentEvent.desc}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Date: <span className='text-black font-medium text-sm'>{currentEvent.date}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Time: <span className='text-black font-medium text-sm'>{currentEvent.time}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Location: <span className='text-black font-medium text-sm'>{currentEvent.venue}</span></h3>
            <h3 className='font-bold text-blue-700 text-xl text-left'>Committee: <span className='text-black font-medium text-sm'>{currentEvent.committee}</span></h3>
            <button onClick={() => setIsPopupOpen(false)} className='absolute top-0 right-0 p-2'><CloseOutlinedIcon/></button>
          </div>
        </div>
      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Faculty;
