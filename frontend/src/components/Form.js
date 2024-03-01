import {React,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Form = () => {
    const [pass, setPass] = useState("");

    const handleChange = (e) => {
      e.preventDefault();
      setPass(e.target.value);
    };
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(pass)
      navigate('/faculty');
    };

    const { user } = useContext(AuthContext);

  return (
    <div className="w-full bg-gradient-to-br from-cyan-800 to-indigo-950 h-screen p-32 flex items-center justify-center flex-col">
                <label
                    htmlFor="eventName"
                    className="block font-normal text-slate-200 mb-2 pl-1 font-bold text-xl"
                >
                    Enter password:
                </label>
                <input
                    type="text"
                    id="pass"
                    required
                    onChange={handleChange}
                    className="p-1 pl-2 pr-2 rounded-lg w-lg focus:outline-none"
                />
                <div>
                <button type='submit' className='px-6 py-2 mt-4 text-white rounded-full cursor-pointer mt-2 w-lg bg-red-700 mr-4 hover:bg-red-600' onClick={handleSubmit}>Accept</button>
                <button type='submit' className='px-6 py-2 mt-4 text-white rounded-full cursor-pointer mt-2 w-lg bg-green-600 hover:bg-green-500' onClick={handleSubmit}>Reject</button>
                </div>
    </div>
  )
}

export default Form