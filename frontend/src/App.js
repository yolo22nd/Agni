import './App.css'
import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Loginpage from "./pages/Loginpage";
import Createpage from "./pages/Createpage"
import Memepage from "./pages/Memepage"
import Userpage from "./pages/Userpage"
import Registerpage from "./pages/Registerpage"
import PrivateRoutes from "./utils/PrivateRoutes";
import Committee from "./pages/Committee";
import SaveBanner from './components/SaveBanner'


import Header from './components/Header';

import { AuthProvider } from './context/AuthContext';
import Student from './components/Student';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <AuthProvider>  
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route exact path='/' element={<Homepage/>}/>
                <Route exact path='/memes' element={<Memepage/>}/>
                <Route exact path='/saved' element={<Userpage/>}/>
                <Route path="/create/:id"  element={<Createpage/>}/>
                <Route path='/committee' element={<Committee/>}/>
                <Route path='/student' element={<Student/>}/>
              </Route>
              {/* <Route path="/" element={<PrivateRoute Component={Homepage} />} /> */}
              {/* <PrivateRoute Component={Homepage} path='/' exact/>   */}
              <Route element={<Loginpage/>} path='/login'/>  
              <Route element={<Registerpage/>} path='/register'/>  
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
