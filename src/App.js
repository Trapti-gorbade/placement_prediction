import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/Home";
function App() {
  return (
    <>
    <Routes>
      Home 
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </>
    
  );
}

export default App;
