import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./Venue.css";
const Venue = () => {
  const [selectedValue, setSelectedValue] = useState("1");
  const [render, setRender] = useState(false);
  const [vacantSeats, setVacantSeats] = useState([]);
  const [vacant, setVacant] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  // Function to handle change in selected value
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const getVacancy = async () => {
      try {
        setVacantSeats([]);
        let res = await axios.post(
          "http://127.0.0.1:8000/venue/available/",
          { date: state.date },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(res.data.available_venues );
        let vacancy = await res.data.available_venues;
        let dummyData = [];
        vacancy.map((v) => {
          if (!dummyData.includes(v)) {
            dummyData.push(v);
          }
        });
        setVacantSeats(dummyData);
        vacantSeats.map((v) => {
          if(v.name!=="djs"){
            // console.log(v)
            let el = document.getElementById(`${v.name}`)
            // console.log(el)
            el.classList.add("vacant");
            el.classList.remove("occupied");
          }
        });
        if(vacantSeats){
          setRender(true);  
        }
      } catch (error) {
        console.error(error);
      }
    };
    getVacancy();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(state.name,
        state.type,
         state.date,
         state.time,
         state.desc,
         state.image,
         state.committee,
        vacant,)
      let res = await axios.post(
        "http://127.0.0.1:8000/events/",
        {
          name: state.name,
          type: state.type,
          date: state.date,
          time: state.time,
          desc: state.desc,
          image: state.image,
          committee: state.committee,
          venue: vacant,
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
    // Check if the roomElement exists before adding the class
    if (roomId) {
      if (roomElement.classList.contains("vacant")) {
        setVacant(roomId)
        for (let index = 1; index < 25; index++) {
          const el = document.getElementById(`${index}`);
          if (el && el.classList.contains("vacant") && index!=roomId) {
            el.classList.remove("selected");
          }
        }
        if (roomElement.classList.contains("selected")) {
          roomElement.classList.remove("selected");
          rId = '';
        } else {
          roomElement.classList.add("selected");
          rId = roomId;
        }
      } else {
        rId = '';
      }
    } else {
      console.log(roomId, "not found");
    }
    setVacant(roomId)
    console.log("v", vacant);
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
              className="occupied p-16 col-span-2 row-span-3"
              id="1"
              onClick={handleClick}
            >
              Room 1
            </div>
            <div
              className=" occupied p-16 col-span-3 row-span-3"
              id="2"
              onClick={handleClick}
            >
              Room 2
            </div>
            <div className=" occupied p-16 row-span-3" id="3" onClick={handleClick}>
              Room 3
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-3"
              id="4"
              onClick={handleClick}
            >
              Room 4
            </div>
            <div
              className=" vacant p-16 col-span-3 row-span-5"
              id="5"
              onClick={handleClick}
            >
              Room 5
            </div>
            <div
              className=" occupied p-16 col-span-2 row-span-6"
              id="6"
              onClick={handleClick}
            >
              Room 6
            </div>

            <div className="bg-white p-16 col-span-2 row-span-6"></div>
            <div className="bg-white p-16 col-span-2 row-span-6"></div>

            <div
              className="occupied p-16 col-span-3 row-span-6"
              id="7"
              onClick={handleClick}
            >
              Room 7
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-4"
              id="8"
              onClick={handleClick}
            >
              Room 8
            </div>

            <div className=" bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div className="bg-white p-16 row-span-3"></div>

            <div
              className="vacant p-16 col-span-2 row-span-3"
              id="9"
              onClick={handleClick}
            >
              Room 9
            </div>
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="10"
              onClick={handleClick}
            >
              Room 10
            </div>
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="11"
              onClick={handleClick}
            >
              Room 11
            </div>
            <div
              className="vacant p-16 col-span-3 row-span-3"
              id="12"
              onClick={handleClick}
            >
              Room 12
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50rem]"></div>
      )}
      {render && selectedValue === "2" ? (
        <div className="mt-8 mx-4 mb-2 p-2">
          <div className="grid grid-cols-12 grid-rows-12 gap-4">
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="13"
              onClick={handleClick}
            >
              Room 13
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-3"
              id="14"
              onClick={handleClick}
            >
              Room 14
            </div>
            <div className="occupied p-16 row-span-3" id="15" onClick={handleClick}>
              Room 15
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-3"
              id="16"
              onClick={handleClick}
            >
              Room 16
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-5"
              id="17"
              onClick={handleClick}
            >
              Room 17
            </div>
            <div
              className="occupied p-16 col-span-2 row-span-6"
              id="18"
              onClick={handleClick}
            >
              Room 18
            </div>
            <div className="bg-white p-16 col-span-2 row-span-6"></div>
            <div className="bg-white p-16 col-span-2 row-span-6"></div>
            <div
              className="occupied p-16 col-span-3 row-span-6"
              id="19"
              onClick={handleClick}
            >
              Room 19
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-4"
              id="20"
              onClick={handleClick}
            >
              Room 20
            </div>
            <div className="bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div className="bg-white p-16 row-span-3"></div>
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="21"
              onClick={handleClick}
            >
              Room 21
            </div>
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="22"
              onClick={handleClick}
            >
              Room 22
            </div>
            <div
              className="occupied p-16 col-span-2 row-span-3"
              id="23"
              onClick={handleClick}
            >
              Room 23
            </div>
            <div
              className="occupied p-16 col-span-3 row-span-3"
              id="24"
              onClick={handleClick}
            >
              Room 24
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
          <div className="px-4 py-2 bg-slate-900 text-white rounded-full cursor-pointer ml-32 mt-2"
            onClick={() => {handleSubmit()}}
          >
            Confirm selection
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
