import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadResume from "./Components/UploadResume";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/upload" element={<UploadResume></UploadResume>}></Route>
      </Routes>
    </div>
  );
}

export default App;
