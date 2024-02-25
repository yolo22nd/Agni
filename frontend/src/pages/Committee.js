"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal} from "flowbite-react";
import Header from "../components/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function Committee() {
  const [render, setRender] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }
  function onCloseModal2() {
    setOpenModal2(false);
  }
  function handleFile(e) {
    setName(e.target.files[0])
  }
  function handleProgress(e){
    setCurrentEvent(e);
    setOpenModal2(true);
  }
  function handleSubmit (e) {
    // e.preventDefault();
    // try {
    //   let res = axios.post('//',

    //   )
    // } catch (e) {
    //   console.error(e)
    // }
    console.log("form submitted")
  }

  let events = [
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: "",
      },
      booking: {},
      venue: {
        place: "DJS HALL",
      },
      regi_members: [],
      type: "",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      date: "25-02-2024",
      time: "19:20",
      image:
        "https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg",
    },
  ];
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <div className="h-max">
        <Header />
        <div className="relative top-12 bg-gradient-to-br from-cyan-800 to-indigo-950 h-max pt-4">
        <div className="max-w-[1300px] mx-auto flex justify-end text-white mt-8 relative">
          <div
            className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-green-700 hover:bg-green-800"
            onClick={() => setOpenModal(true)}
          >
            Create New Event <AddIcon />
          </div>
          <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-yellow-600 hover:bg-yellow-700">
            View All Events <RemoveRedEyeIcon className="pl-1" />
          </div>
        </div>
        <Modal
          className="bg-opacity-70"
          show={openModal}
          size="md"
          onClose={onCloseModal}
          popup
        >
          <Modal.Header className="text-red-400 w-2/6 mx-auto bg-slate-600 font-bold rounded-tl-2xl rounded-tr-2xl" />
          <Modal.Body className="w-2/6 m-auto bg-slate-600 p-10 rounded-br-2xl rounded-bl-2xl">
            <div className="space-y-6">
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
                  <div className="flex justify-between mb-8">
                  <div className="w-full">
                      <label
                        htmlFor="eventImg"
                        className="block font-normal text-slate-200 mb-0.5 pl-1"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="eventImg"
                        onChange={(e) => handleFile(e)}
                        accept="image/*"
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
            </div>
          </Modal.Body>
        </Modal>
        
        <Modal 
          className="bg-opacity-70"
          show={openModal2}
          size="md"
          onClose={onCloseModal2}
          popup>
          <Modal.Header className="text-red-400 w-2/6 mx-auto bg-slate-600 font-bold rounded-tl-2xl rounded-tr-2xl" />
          <Modal.Body className="w-2/6 m-auto bg-slate-600 p-10 rounded-br-2xl rounded-bl-2xl">
            <ol class="flex items-center w-full text-sm font-medium text-center text-gray-100 sm:text-base">
              <li class="flex md:w-full items-center text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b  after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 after:border-gray-700">
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-500">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg> Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
              <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-500">
                  <span class="me-2">2</span> {currentEvent.name} <span class="hidden sm:inline-flex sm:ms-2">{currentEvent.date}</span>
                </span>
              </li>
              <li class="flex items-center">
                <span class="me-2">3</span> Confirmation
              </li> 
            </ol>
          </Modal.Body>

        </Modal>
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Your Events</h1>
        </div>
        <div className="max-w-[1300px] m-auto pt-10 flex flex-wrap justify-around">
          {render &&
            events.map((e) => {
              return (
                <div
                  key={e._id}
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
                        <LocationOnIcon /> {e.venue.place}
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
            })}
        </div>
        </div>
    </div>
  );
}

export default Committee;
