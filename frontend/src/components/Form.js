import {React,useState,useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const Form = () => {
    const [pass, setPass] = useState("");
    const handleChange = (e) => {
      e.preventDefault();
      setPass(e.target.value);
    };
    const navigate = useNavigate();
    const { encoded_data } = useParams(); // Fetch the encoded data from the URL

    const handleSubmit = async () => {
        console.log(pass)
        try {
            let response = await axios.post(`http://127.0.0.1:8000/approve/${encoded_data}/`, { // Pass the encoded data in the URL
                password: pass // Pass the password in the request body
            }, {
                headers:{
                    'Content-Type':'application/json',
                }
            });
            if (response.status === 200) {
                alert("Request Approved");
                window.close();
            } else {
                alert("Wrong password. Request still pending");
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div className="w-full bg-gradient-to-br from-cyan-800 to-indigo-950 h-screen p-32 flex items-center justify-center flex-col">
                <label
                    htmlFor="eventName"
                    className="block font-normal text-slate-200 mb-2 pl-1 font-bold text-xl"
                >
                    Enter password:
                </label>
                <input
                    type="password"
                    id="pass"
                    required
                    onChange={handleChange}
                    className="p-1 pl-2 pr-2 rounded-lg w-lg focus:outline-none"
                />
                <div>
                <button type='submit' className='px-6 py-2 mt-4 text-white rounded-full cursor-pointer mt-2 w-lg bg-red-700 mr-4 hover:bg-red-600' onClick={handleSubmit}>Accept</button>
                </div>
    </div>
  )
}
export default Form
