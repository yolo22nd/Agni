import './App.css'
import React from 'react';
import { BrowserRouter ,Routes, Route, } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Loginpage from "./pages/Loginpage";
import Createpage from "./pages/Createpage"
import Memepage from "./pages/Memepage"
import Userpage from "./pages/Userpage"
import Registerpage from "./pages/Registerpage"
import StudentRoutes from "./utils/StudentRoutes";
import FacultyRoutes from "./utils/FacultyRoutes";
import CommitteeRoutes from "./utils/CommitteeRoutes";
import Committee from "./pages/Committee";
import Buy from './components/Buy';
import DisplayRazorPay from './components/DisplayRazorPay';

import { AuthProvider } from './context/AuthContext';
import Faculty from './pages/Faculty';
import Student from './components/Student';
import Venue from './components/Venue';
import Form from './components/Form';
import DetailsPage from './pages/DetailsPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <AuthProvider>  
            <Routes>
              <Route element={<StudentRoutes/>}>
                <Route path='/student' element={<Student/>}/>
                <Route exact path='/pay' element={<DisplayRazorPay/>}/>
                <Route path="/buy/:id"  element={<Buy/>}/>
              </Route>

              <Route element={<CommitteeRoutes/>}>
                <Route path="/create/:id"  element={<Createpage/>}/>
                <Route path='/committee' element={<Committee/>}/>
                <Route path='/venue' element={<Venue/>}/>
                <Route path="/details"  element={<DetailsPage/>}/>
              </Route>
              <Route element={<FacultyRoutes/>}>
                <Route path='/Faculty' element={<Faculty/>}/>
              </Route>
              <Route path="/form/:encoded_data"  element={<Form/>}/>
                {/* <Route exact path='/' element={<Homepage/>}/>
                <Route exact path='/memes' element={<Memepage/>}/>
                <Route exact path='/saved' element={<Userpage/>}/> */}
              {/* <Route path="/" element={<PrivateRoute Component={Homepage} />} /> */}
              {/* <PrivateRoute Component={Homepage} path='/' exact/>   */}
              <Route element={<Loginpage/>} path='/login'/>  
              <Route element={<Loginpage/>} path='/'/>  
              <Route element={<Registerpage/>} path='/register'/>  
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
