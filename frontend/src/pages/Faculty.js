import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Faculty() {
  const [render, setRender] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [pendingevents,setPendingEvents] = useState([]);
  const [events,setEvents] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    setRender(true);
    getPendingEvents()
    getEvents()
  }, []);


  let getPendingEvents = async()=>{
    let fac_id=user.fac_id
    console.log("fetching response")
    let response = await fetch('http://127.0.0.1:8000/events/display/student/pending/', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            // 'Authorization':'Bearer '+String(authTokens.access),
          },
          body:JSON.stringify({fac_id})     
    })  
        console.log("response fetched")
    let data = await response.json()
    console.log("data set")
    console.log(data)
    if (response.status === 200) {
      setPendingEvents(data.event_list);
      console.log('events set')
  } 
  // else if (response.statusText === 'Unauthorized'){
  //   logOutUser()
  // }  
}

  let getEvents = async()=>{
    console.log("fetching response")
    let response = await fetch('http://127.0.0.1:8000/events/display/student/previous/', {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            // 'Authorization':'Bearer '+String(authTokens.access),
          }
    })
        console.log("response fetched")
    let data = await response.json()
    console.log("data set")
    console.log(data)
    if (response.status === 200) {
      setEvents(data);
      console.log('events set')
  } 
  // else if (response.statusText === 'Unauthorized'){
  //   logOutUser()
  // }  
}


  function approveAll() {
    let a = document.getElementById("approveAll").checked;
    if (a) {
      let b = window.confirm(
        "Are you sure you want to approve all the pending requests?"
      );
      if (b === true) {
        let pass = prompt("Enter password to proceed");
        if (pass === "Hello") {
          try {
            pendingevents.map((ev) => {
                alert("All requests accepted")
            });
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("Wrong password. Request still pending");
          document.getElementById("approveAll").checked = false;
        }
      }
      else{
        document.getElementById("approveAll").checked = false;
      }
    }
  }
  let approve = async(e)=>{
    console.log("fetching response")
    let response = await fetch('http://127.0.0.1:8000/events/approval/'+e.name+'/'+user.fac_id+'/', {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            // 'Authorization':'Bearer '+String(authTokens.access),
          }
    })
        console.log("response fetched")
    let data = await response.json()
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
  function handleReject(e) {
    try {
      let pass = prompt("Enter password to proceed");
      if (pass === "Hello") {
        alert("Request Rejeted");
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
            pendingevents.map((e) => {
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
                              {e.venue}
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
                        <span className="pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500">
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
            events.map((e) => {
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
                              {e.venue.place}
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
                        <span className="pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500">
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
