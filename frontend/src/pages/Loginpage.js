import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Loginpage = () => {
  const { loginUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-bl from-indigo-950 to-cyan-800 h-screen">
      <div className="bg-white bg-opacity-10 sm:w-full sm:max-w-sm p-4 px-8 rounded-xl" style={{boxShadow:'#1e1f4e 6px 6px 10px'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label
              htmlFor="userType"
              className="block text-left text-md font-medium leading-6 text-white"
            >
              Sign in as
            </label>
            <div className="mt-2 flex justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  id="faculty"
                  value="faculty"
                  required
                />
                <label
                  htmlFor="faculty"
                  className="text-left text-sm leading-6 text-white pl-1"
                >
                  Faculty
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  id="committee"
                  value="committee"
                  required
                />
                <label
                  htmlFor="committee"
                  className="text-left text-sm leading-6 text-white pl-1"
                >
                  Committee
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  id="student"
                  value="student"
                  required
                />
                <label
                  htmlFor="student"
                  className="text-left text-sm leading-6 text-white pl-1"
                >
                  Student
                </label>
              </div>
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
                type="text"
                autoComplete="email"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-300 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-200">
          Don't have an account?
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
          >
            {" "}
            Register here
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Loginpage;
