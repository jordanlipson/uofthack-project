import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from "react-webcam";
import { drawPoint, drawSegment } from "./utilities";


function App() {

  return (
    <div className="App">
      <h1>Hi</h1>
    </div>
  );
}

export default App;