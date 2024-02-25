import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Venue.css'
const Venue = () => {
    const [selectedValue, setSelectedValue] = useState('1');

    // Function to handle change in selected value
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate('/committee');
    };

    const handleClick = (event) => {
      const roomId = event.target.id;
      console.log("Clicked room id:", roomId);
      const roomElement = document.getElementById(roomId);
  // Check if the roomElement exists before adding the class
  if(roomElement.classList.contains('vacant')){
    if (roomElement.classList.contains('selected')) {
      roomElement.classList.remove('selected');
    }
    else roomElement.classList.add('selected');
  }
    };
    return (
        <div className='w-full h-16 bg-slate-900'>
        <style></style>
        <label htmlFor="floor" className='text-white mt-4'>Select floor :&nbsp;&nbsp;</label>
      <select value={selectedValue} onChange={handleChange} className='mt-4 px-4 py-2 rounded-2xl'>
        <option value="1" className='px-2 py-2 text-xl'>Floor 1</option>
        <option value="2" className='px-2 py-2 text-xl'>Floor 2</option>
      </select>
      {selectedValue==='1' && 
        <div className='mt-8 mx-4 mb-2 p-2'>
            <div class="grid grid-cols-12 grid-rows-12 gap-4">
            <div class="vacant p-16 col-span-2 row-span-3" id='1' onClick={handleClick}>Room 1</div>
            <div  class=" occupied p-16 col-span-3 row-span-3" id='2' onClick={handleClick}>Room 2</div>
            <div  class=" occupied p-16 row-span-3" id='0' onClick={handleClick}>Room 1</div>
            <div  class="occupied p-16 col-span-3 row-span-3" id='3' onClick={handleClick}>Room 3</div>
            <div  class=" occupied p-16 col-span-3 row-span-5" id='4' onClick={handleClick}>Room 4</div>
            <div  class=" occupied p-16 col-span-2 row-span-6" id='5' onClick={handleClick}>Room 5</div>

            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>

            <div  class="occupied p-16 col-span-3 row-span-6" id='6' onClick={handleClick}>Room 6</div>
            <div class="occupied p-16 col-span-3 row-span-4" id='7' onClick={handleClick}>Room 7</div>

            <div class=" bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div class="bg-white p-16 row-span-3"></div>

            <div  class="occupied p-16 col-span-2 row-span-3" id='8' onClick={handleClick}>Room 8</div>
            <div  class="occupied p-16 col-span-2 row-span-3" id='9' onClick={handleClick}>Room 9</div>
            <div  class="occupied p-16 col-span-2 row-span-3" id='10' onClick={handleClick}>Room 10</div>
            <div  class="occupied p-16 col-span-3 row-span-3" id='11' onClick={handleClick}>Room 11</div>
        </div>
        </div>
      }
      {selectedValue==='2' && 
        <div className='mt-8 mx-4 mb-2 p-2'>
            <div class="grid grid-cols-12 grid-rows-12 gap-4">
            <div class="occupied p-16 col-span-2 row-span-3" id='a' onClick={handleClick}>Room A</div>
            <div  class="occupied p-16 col-span-3 row-span-3" id='b' onClick={handleClick}>Room B</div>
            <div  class="occupied p-16 row-span-3" id='c' onClick={handleClick}>Room C</div>
            <div  class="occupied p-16 col-span-3 row-span-3" id='d' onClick={handleClick}>Room D</div>
            <div  class="occupied p-16 col-span-3 row-span-5" id='e' onClick={handleClick}>Room E</div>
            <div  class="occupied p-16 col-span-2 row-span-6" id='f' onClick={handleClick}>Room F</div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div  class="occupied p-16 col-span-3 row-span-6" id='g' onClick={handleClick}>Room G</div>
            <div  class="occupied p-16 col-span-3 row-span-4" id='h' onClick={handleClick}>Room H</div>
            <div class="bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div class="bg-white p-16 row-span-3"></div>
            <div  class="occupied p-16 col-span-2 row-span-3"  id='i' onClick={handleClick}>Room I</div>
            <div  class="occupied p-16 col-span-2 row-span-3" id='j' onClick={handleClick}>Room J</div>
            <div class="occupied p-16 col-span-2 row-span-3" id='k' onClick={handleClick}>Room K</div>
            <div  class="occupied p-16 col-span-3 row-span-3" id='l' onClick={handleClick}>Room L</div>
        </div>
        </div>
      }
      <div className='flex ml-8'>
      <div className='mt-4'>
        <span className='mr-4 font-bold text-xl'>Rooms:</span>
        <span className='h-8 w-8 bg-gray-200 px-4 py-2 rounded-xl mr-2'></span>
      <span className='mr-8'>Occupied</span>
      <span className='h-8 w-8 border-2 border-gray-200 px-4 py-2 rounded-xl mr-2'></span>
      <span>Vacant</span>
      </div>
      <div>
        <button className='px-4 py-2 bg-slate-900 text-white rounded-full cursor-pointer ml-32 mt-2' onClick={handleGoBack}>Confirm selection</button>
      </div>
      </div>
    </div>
  )
}

export default Venue