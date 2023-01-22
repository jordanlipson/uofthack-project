import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import "./components/App.css"
import Home from "./components/Home";
import Workouts from "./components/Workouts.js"
import Camera from "./components/Camera";

function App() {
  return (
    <div className="App">
      {/* <Home />
      <Workouts /> */}
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/workouts" element={<Workouts />} /> */}
          <Route path='/camera' element={<Camera />} />
        </Routes>
      </Router>

      {/* <Router>
        <Routes>
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;