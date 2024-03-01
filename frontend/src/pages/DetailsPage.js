import React from 'react'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const userData = [
    { name: "Alice", dept: "Computer Science", roll_no: "CSE001", ac_year: 2022 },
    { name: "Bob", dept: "Electrical Engineering", roll_no: "EEE002", ac_year: 2023 },
    { name: "Charlie", dept: "Mechanical Engineering", roll_no: "ME003", ac_year: 2024 },
    { name: "David", dept: "Civil Engineering", roll_no: "CE004", ac_year: 2022 },
    { name: "Eve", dept: "Chemical Engineering", roll_no: "CHE005", ac_year: 2023 }
  ];
  
  const DetailsPage = () => {
    const navigate=useNavigate();
    const handleGoBack = () => {
    //   navigate('/committee')
      navigate(-1)
    };
  
    return (
      <div>
        <button onClick={handleGoBack} className="text-black  px-2 py-2 rounded-full mb-4 absolute top-2 right-2">
          <CloseIcon/>
        </button>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-6 text-left text-xs font-bold text-black-500 uppercase tracking-wider">
                Name
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
                <td className="px-6 py-4 whitespace-nowrap text-left">{user.dept}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left">{user.roll_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left">{user.ac_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default DetailsPage