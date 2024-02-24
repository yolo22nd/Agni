import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Faculty() {
    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(true);
    }, [])

    function approveAll() {
        let a = document.getElementById('approveAll').checked
        if(a){
            let b =window.alert("Are you sure you want to approve all the pending requests?");
            if(b){
                try{
                    
                }catch(e){
                    console.log(e)
                }
            }
        }
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
    ]
  return (
    <div className="bg-gradient-to-br from-cyan-800 to-indigo-950 h-max pb-5">
        <Header/>
        <div className="mt-10 max-w-[1300px] m-auto text-white font-bold text-4xl w-full border-b-4 border-slate-300 pb-4">
          <h1>Pending Requests</h1>
        </div>
        <div className='mt-8'>
            <div className='mb-8 text-right max-w-[1500px]'>
                <input type="checkbox" name="" id="approveAll" className='mr-2 w-5' onClick={() =>approveAll()}/>
                <label htmlFor="approveAll" className='text-sky-100 font-semibold text-xl'>Approve All</label>
            </div>
            {render && events.map((e) => {
                return (
                    <div key={e.name} className='w-[1100px] h-40 bg-slate-500 m-auto rounded-3xl p-2 pl-3 pr-3 mb-5'>
                        <div className='flex justify-between h-full'>
                            <div className='h-full flex'>
                                <div className='flex items-center h-full'>
                                    <img src={e.image} alt="" className='w-56 ml-5'/>
                                </div>
                                <div className='pl-3 pt-2'>
                                    <div className='text-white text-left font-bold text-4xl'>{e.name}</div>
                                    <div className='flex pt-14'>
                                        <div className='text-slate-100 text-left font-medium'>Venue: <span className='font-normal text-md'>{e.venue.place}</span></div>
                                        <div className='text-slate-100 text-left font-medium ml-5'>Date: <span className='font-normal text-md'>{e.date}</span></div>
                                    </div>
                                </div>
                                <div className='h-5/6 my-auto flex items-end ml-10'>
                                    <span className='pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500'>View More</span>
                                </div>
                            </div>
                            <div className='flex flex-col justify-around h-full mr-5'>
                                <div className="flex text-white items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-green-500 hover:bg-green-600">
                                    Accept <DoneIcon/>
                                </div>
                                <div className="flex text-white items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 hover:cursor-pointer bg-red-600 hover:bg-red-700">
                                    Reject <CloseIcon/>
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
        <div className='mt-8'>
            {render && events.map((e) => {
                return (
                    <div key={e.name} className='w-[1100px] h-40 bg-slate-500 m-auto rounded-3xl p-2 pl-3 pr-3 mt-5'>
                        <div className='flex justify-between h-full'>
                            <div className='h-full flex'>
                                <div className='flex items-center h-full'>
                                    <img src={e.image} alt="" className='w-56 ml-5'/>
                                </div>
                                <div className='pl-3 pt-2'>
                                    <div className='text-white text-left font-bold text-4xl'>{e.name}</div>
                                    <div className='flex pt-14'>
                                        <div className='text-slate-100 text-left font-medium'>Venue: <span className='font-normal text-md'>{e.venue.place}</span></div>
                                        <div className='text-slate-100 text-left font-medium ml-5'>Date: <span className='font-normal text-md'>{e.date}</span></div>
                                    </div>
                                </div>
                                <div className='h-5/6 my-auto flex items-end ml-10'>
                                    <span className='pb-1 text-sky-400 underline hover:cursor-pointer hover:text-sky-500'>View More</span>
                                </div>
                            </div>
                            <div className='flex flex-col justify-around h-full mr-5'>
                                <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 text-green-500">
                                    Accepted <DoneIcon/>
                                </div>
                                <div className="flex items-center ml-5 rounded-xl p-1.5 pl-3 pr-3 text-red-600">
                                    Rejected <CloseIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default Faculty