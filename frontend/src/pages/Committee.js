import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Committee() {
  const [render, setRender] = useState(false);

  let events = [
    {
      _id: 123456,
      name: "DJS Trinity",
      committee: {
        name: "",
        department: {},
        email: "",
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
        desc: ""
      },
      booking: {},
      venue: {
        place: "DJS HALL"
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
    <div className="bg-gradient-to-br from-cyan-800 to-indigo-950 h-screen">
    <div className="bg-gradient-to-br from-cyan-800 to-indigo-950 h-max">
      <Header />
      <div className="max-w-[1300px] mx-auto flex justify-end text-white mt-8">
        <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-green-700 hover:bg-green-800">Create New Event <AddIcon/></div>
        <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-yellow-600 hover:bg-yellow-700">View All Events <RemoveRedEyeIcon className="pl-1"/></div>
      </div>
      <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300   pb-4">
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
                  <div class="font-bold text-xl mb-2 text-white">{e.name}</div>
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
                        <FiberManualRecordIcon sx={{ fontSize: 4 }} /> {e.time}
                      </span>
                    </div>
                    <div>
                        <Link to ='' className="text-sm  text-blue-400 underline">View more <KeyboardArrowRightIcon sx={{ fontSize: 20 }}/> </Link>
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
