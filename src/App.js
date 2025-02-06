import React, {useState, useEffect} from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UploadResume from "./Components/UploadResume.js";
import Profile from './routes/Profile';
import SmoothScroll from "smart-scroll"
import Landing from './Components/Landing.js';
import "./App.css";
import Registration from './Components/Registration.js';
import Login from "./Components/Login.js"


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
function App() {
    return (
      <div>
        <Routes>
          <Route path='/register' element = {<Registration></Registration>}></Route>
          <Route path='/' element = {<Landing></Landing>}></Route>
          <Route path='/login' element = {<Login></Login>}></Route>
          <Route path='/resume' element = {<UploadResume></UploadResume>}></Route>
        </Routes>
      </div>
    )
  
}

export default App;
