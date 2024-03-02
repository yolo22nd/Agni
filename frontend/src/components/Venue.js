import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./Venue.css";
const Venue = () => {
  const [selectedValue, setSelectedValue] = useState("1");
  const [render, setRender] = useState(true);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [vacantSeat, setVacantSeat] = useState("");
  const [committeeEventData, setCommitteeEventData] = useState([]);

  const { state } = useLocation();
  const navigate = useNavigate();

  // Function to handle change in selected value
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    getVacancy();
  };

  const getVacancy = async () => {
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/venue/available/",
        { date: state.date },
        { headers: { "Content-Type": "application/json" } }
      );
      let occupied = await res.data.unavailable_venues;
      console.log(occupied);
      setOccupiedSeats([]);
      setOccupiedSeats(occupied);
      console.log(occupiedSeats);
      setTimeout(() => {
        if(occupied[0] !== null){
          occupied.map((o) => {
            if(o.name !== "djs") {
              let el = document.getElementById(`${o.name}`);
              el?.classList.add("occupied");
              el?.classList.remove("vacant");
            }
          });
        }
      }, 300);
      if (occupiedSeats) {
        setRender(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getEventData = async () => {
    try {
      setCommitteeEventData([])
      let res = await axios.post('http://127.0.0.1:8000/events/display/', { 
        date: state.date // Add the date to the body of the request
      }, { 
        headers: { 'Content-Type': 'application/json' } 
      });
      let eventData = await res.data;
      console.log(eventData); // Check the retrieved data
      let dummyData = [];
      eventData.map((e) => {
        if(!dummyData.includes(e))
          dummyData.push(e);
        setCommitteeEventData(dummyData)
      });
      if (committeeEventData == null) setRender(false);
      console.log(committeeEventData);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getVacancy();
    getEventData();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(
        state.name,
        state.type,
        state.date,
        state.time,
        state.desc,
        state.image,
        state.committee,
        vacantSeat
      );
      let res = await axios.post(
        "http://127.0.0.1:8000/events/",
        {
          name: state.name,
          type: state.type,
          desc: state.desc,
          date: state.date,
          image: state.image,
          time: state.time,
          committee: state.committee,
          venue: vacantSeat,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res);
      navigate("/committee");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (event) => {
    const roomId = event.target.id;
    let rId = "";
    console.log("Clicked room id:", roomId);
    const roomElement = document.getElementById(roomId);
    if (roomId) {
      if (roomElement.classList.contains("vacant")) {
        setVacantSeat(roomId);
        for (let index = 1; index < 25; index++) {
          const el = document.getElementById(`${index}`);
          if (el && el.classList.contains("vacant") && index != roomId) {
            el.classList.remove("selected");
          }
        }
        if (roomElement.classList.contains("selected")) {
          roomElement.classList.remove("selected");
          rId = "";
        } else {
          roomElement.classList.add("selected");
          setVacantSeat(roomId);
        }
      } else {
        rId = "";
      }
    } else {
      console.log(roomId, "not found");
    }
    console.log("v", vacantSeat);
  };

  return (
    <div className="w-full h-16 bg-slate-900">
      <style></style>
      <label htmlFor="floor" className="text-white mt-4">
        Select floor :&nbsp;&nbsp;
      </label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="mt-4 px-4 py-2 rounded-2xl"
      >
        <option value="1" className="px-2 py-2 text-xl">
          Floor 1
        </option>
        <option value="2" className="px-2 py-2 text-xl">
          Floor 2
        </option>
      </select>
      {render && selectedValue === "1" ? (
        <div className="mt-8 mx-4 mb-2 p-2">
          <div className="grid grid-cols-12 grid-rows-12 gap-4">
            <div
              className=" vacant p-12 col-span-2 row-span-3"
              id="1"
              onClick={handleClick}
            >
              Room 1
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '1'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className=" vacant p-12 col-span-3 row-span-3"
              id="2"
              onClick={handleClick}
            >
              Room 2
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '2'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className=" vacant p-12 row-span-3"
              id="3"
              onClick={handleClick}
            >
              Room 3
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '3'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-3"
              id="4"
              onClick={handleClick}
            >
              Room 4
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '4'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className=" vacant p-12 col-span-3 row-span-5"
              id="5"
              onClick={handleClick}
            >
              Room 5
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '5'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className=" vacant p-12 col-span-2 row-span-6"
              id="6"
              onClick={handleClick}
            >
              Room 6
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '6'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>

            <div className="bg-white p-12 col-span-2 row-span-6"></div>
            <div className="bg-white p-12 col-span-2 row-span-6"></div>

            <div
              className="vacant p-12 col-span-3 row-span-6"
              id="7"
              onClick={handleClick}
            >
              Room 7
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '7'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-4"
              id="8"
              onClick={handleClick}
            >
              Room 8
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '8'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>

            <div className=" bg-white p-12 col-span-2 row-span-3">Entrance</div>
            <div className="bg-white p-12 row-span-3"></div>

            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="9"
              onClick={handleClick}
            >
              Room 9
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '9'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="10"
              onClick={handleClick}
            >
              Room 10
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '10'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="11"
              onClick={handleClick}
            >
              Room 11
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '11'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-3"
              id="12"
              onClick={handleClick}
            >
              Room 12
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '12'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {render && selectedValue === "2" ? (
        <div className="mt-8 mx-4 mb-2 p-2">
          <div className="grid grid-cols-12 grid-rows-12 gap-4">
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="13"
              onClick={handleClick}
            >
              Room 13
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '13'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-3"
              id="14"
              onClick={handleClick}
            >
              Room 14
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '14'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 row-span-3"
              id="15"
              onClick={handleClick}
            >
              Room 15
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '15'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-3"
              id="16"
              onClick={handleClick}
            >
              Room 16
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '16'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-5"
              id="17"
              onClick={handleClick}
            >
              Room 17
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '17'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-2 row-span-6"
              id="18"
              onClick={handleClick}
            >
              Room 18
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '18'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div className="bg-white p-12 col-span-2 row-span-6"></div>
            <div className="bg-white p-12 col-span-2 row-span-6"></div>
            <div
              className="vacant p-12 col-span-3 row-span-6"
              id="19"
              onClick={handleClick}
            >
              Room 19
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '19'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-4"
              id="20"
              onClick={handleClick}
            >
              Room 20
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '20'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div className="bg-white p-12 col-span-2 row-span-3">Entrance</div>
            <div className="bg-white p-12 row-span-3"></div>
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="21"
              onClick={handleClick}
            >
              Room 21
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '21'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="22"
              onClick={handleClick}
            >
              Room 22
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '22'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-2 row-span-3"
              id="23"
              onClick={handleClick}
            >
              Room 23
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '23'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
            <div
              className="vacant p-12 col-span-3 row-span-3"
              id="24"
              onClick={handleClick}
            >
              Room 24
              <p className="text-indigo-600">{committeeEventData? committeeEventData.map((c) => {
                if(c.venue === '24'){
                  return `occupied by ${c.name}`
                }
              }) : ''}</p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex ml-8">
        <div className="mt-4">
          <span className="mr-4 font-bold text-xl">Rooms:</span>
          <span className="h-8 w-8 bg-gray-200 px-4 py-2 rounded-xl mr-2"></span>
          <span className="mr-8">Occupied</span>
          <span className="h-8 w-8 border-2 border-gray-200 px-4 py-2 rounded-xl mr-2"></span>
          <span>Vacant</span>
        </div>
        <div>
          <div
            className="px-4 py-2 bg-slate-900 text-white rounded-full cursor-pointer ml-32 mt-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            Confirm selection
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
