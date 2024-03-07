import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom'; 

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);  // Get the registerUser function from context

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [rollno, setRollno] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(username, password, email, rollno, year);  // Call the registerUser function with username, password, email, rollno, and year
    };

    return (
        <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-bl from-indigo-950 to-cyan-800 h-screen">
          <div className="bg-white bg-opacity-10 sm:w-full sm:max-w-sm p-4 px-8 rounded-xl" style={{boxShadow:'#1e1f4e 6px 6px 10px'}}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Register your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                {/* New code for username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-left text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

                {/* New code for roll number */}
                <div>
                  <label
                    htmlFor="rollno"
                    className="block text-left text-sm font-medium leading-6 text-white"
                  >
                    Roll Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="rollno"
                      name="rollno"
                      type="text"
                      required
                      onChange={(e) => setRollno(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* New code for year */}
                {/* <div>
                  <label
                    htmlFor="year"
                    className="block text-left text-sm font-medium leading-6 text-white"
                  >
                    Year
                  </label>
                  <div className="mt-2">
                    <input
                      id="year"
                      name="year"
                      type="text"
                      required
                      onChange={(e) => setYear(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}

                <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
              </form>

              <p className="mt-10 text-center text-sm text-slate-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
                >
                  {" "}
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
    );
};

export default RegisterPage;
