import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/Home";
import Profile from './routes/Profile';
function App() {
  return (
    <>
    <Routes>
      Home 
      <Route path="/" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
    
  );
}

export default App;
