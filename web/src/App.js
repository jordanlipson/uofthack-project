import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import "./components/App.css"
import Home from "./components/Home";
import Workouts from "./components/Workouts.js"
import Camera from "./components/Camera";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/uofthack-project" element={<Home />} />
          <Route path='/camera' element={<Camera />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;