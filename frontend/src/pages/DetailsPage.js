import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const DetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchRegisteredStudents = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/committee/regi_students/', {
                    name: location.state.name
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRegisteredStudents();
    }, [location]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack} className="text-black px-2 py-2 rounded-full mb-4 absolute top-2 right-2">
                <CloseIcon />
            </button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                            Email id
                        </th>
                        <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                            Department
                        </th>
                        <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                            Roll No
                        </th>
                        <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                            Academic Year
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {userData.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-left">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{user.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{user.rollno}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{user.ac_year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailsPage;
