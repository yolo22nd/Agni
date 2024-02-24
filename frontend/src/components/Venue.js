import {React,useState} from 'react'

const Venue = () => {
    const [selectedValue, setSelectedValue] = useState('');

    // Function to handle change in selected value
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    const occupiedStyle={
        background:"rgb(229 231 235 )"
    }
    const vacantStyle={
        background:"white",
        border:'2px solid rgb(229 231 235 )',
        cursor:'pointer',
    }
  return (
    <div className='w-full h-16 bg-slate-900'>
        <label htmlFor="floor" className='text-white mt-4'>Select floor :&nbsp;&nbsp;</label>
      <select value={selectedValue} onChange={handleChange} className='mt-4 px-4 py-2 rounded-2xl'>
        <option value="1" className='px-2 py-2 text-xl'>Floor 1</option>
        <option value="2" className='px-2 py-2 text-xl'>Floor 2</option>
      </select>
      {selectedValue==='1' && 
        <div className='mt-8 mx-4 mb-2 p-2'>
            <div class="grid grid-cols-12 grid-rows-12 gap-4">
            <div class="p-16 col-span-2 row-span-3" style={{...occupiedStyle}} id='1'>Room 1</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='2'>Room 2</div>
            <div style={{...occupiedStyle}} class=" p-16 row-span-3" id=''>Room 1</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='3'>Room 3</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-3 row-span-5" id='4'>Room 4</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-2 row-span-6" id='5'>Room 5</div>

            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>

            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-6" id='6'>Room 6</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-4" id='7'>Room 7</div>

            <div class="bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div class="bg-white p-16 row-span-3"></div>

            <div style={{...occupiedStyle}} class=" p-16 col-span-2 row-span-3" id='8'>Room 8</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-2 row-span-3" id='9'>Room 9</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-2 row-span-3" id='10'>Room 10</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='11'>Room 11</div>
        </div>
        </div>
      }
      {selectedValue==='2' && 
        <div className='mt-8 mx-4 mb-2 p-2'>
            <div class="grid grid-cols-12 grid-rows-12 gap-4">
            <div class="p-16 col-span-2 row-span-3" style={{...occupiedStyle}} id='a'>Room A</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='b'>Room B</div>
            <div style={{...occupiedStyle}} class=" p-16 row-span-3" id='c'>Room C</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='d'>Room D</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-3 row-span-5" id='e'>Room E</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-2 row-span-6" id='f'>Room F</div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div class="bg-white p-16 col-span-2 row-span-6"></div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-6" id='g'>Room G</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-4" id='h'>Room H</div>
            <div class="bg-white p-16 col-span-2 row-span-3">Entrance</div>
            <div class="bg-white p-16 row-span-3"></div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-2 row-span-3"  id='i'>Room I</div>
            <div style={{...vacantStyle}} class=" p-16 col-span-2 row-span-3" id='j'>Room J</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-2 row-span-3" id='k'>Room K</div>
            <div style={{...occupiedStyle}} class=" p-16 col-span-3 row-span-3" id='l'>Room L</div>
        </div>
        </div>
      }
    </div>
  )
}

export default Venue