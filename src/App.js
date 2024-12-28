import React from 'react';
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadResume from "./Components/UploadResume";
import Profile from './routes/Profile';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/upload" element={<UploadResume></UploadResume>}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
