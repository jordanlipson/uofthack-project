import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from "react-webcam";
import { drawPoint, drawSegment, keypointConnections, POINTS, find_angle, speak } from "../utilities";
import { useLocation } from "react-router-dom";

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function Camera(props) {

  let skeletonColor = 'rgb(255,255,255)';

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [prompt, setPrompt] = useState("This is defualt text");
  const [counter, setCounter] = useState(0);
  const [playStatus, setPlayStatus] = useState("_play");

  function instructions(text){
    speechSynthesis.cancel()
    setPlayStatus(prev => {
      if (prev === "_play") {
      // if uncommenting code above, replace textToRead with text here
        speak(text, setPlayStatus, window.speechSynthesis)
        return "_pause"
      }
      return "_play"
    })
  }
  
  const { state } = useLocation();
  async function runMovenet(){
    console.log(state);
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
    };
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    setInterval(() => { 
      detectPose(detector)
    }, 100)
  }
  
  async function detectPose(detector){
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const keypoints = pose[0].keypoints;

      let input = keypoints.map((keypoint) => {
        if(keypoint.score > 0.4) {
          if(!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
            drawPoint(ctx, keypoint.y, keypoint.x, 8, 'rgb(255,255,255)')
            let connections = keypointConnections[keypoint.name];
            try {
              connections.forEach((connection) => {
                let conName = connection.toUpperCase()
                drawSegment([keypoint.y, keypoint.x],
                    [keypoints[POINTS[conName]].y,
                     keypoints[POINTS[conName]].x]
                , skeletonColor, 1, ctx);
              })
            } catch(err) {
              // console.log("error drawing segment", err);
            }
            
          }
        } 
        return [-keypoint.x, keypoint.y]
      }) 
      if (state.exercise == 'bicep') {
        bicepCurl(keypoints);
      }
      if (state.exercise == 'lunge') {
        lunge(keypoints);
      }
    }
  }

  function bicepCurl(keypoints){
    let angleRight = find_angle(
      {x: keypoints[POINTS["RIGHT_SHOULDER"]].x, y: keypoints[POINTS["RIGHT_SHOULDER"]].y},
      {x: keypoints[POINTS["RIGHT_ELBOW"]].x, y: keypoints[POINTS["RIGHT_ELBOW"]].y},
      {x: keypoints[POINTS["RIGHT_WRIST"]].x, y: keypoints[POINTS["RIGHT_WRIST"]].y},
      ) * 180 / Math.PI;

    let angleLeft = find_angle(
      {x: keypoints[POINTS["LEFT_SHOULDER"]].x, y: keypoints[POINTS["LEFT_SHOULDER"]].y},
      {x: keypoints[POINTS["LEFT_ELBOW"]].x, y: keypoints[POINTS["LEFT_ELBOW"]].y},
      {x: keypoints[POINTS["LEFT_WRIST"]].x, y: keypoints[POINTS["LEFT_WRIST"]].y},
      ) * 180 / Math.PI;


    let leftSide = find_angle(
      {x: keypoints[POINTS["LEFT_ELBOW"]].x, y: keypoints[POINTS["LEFT_ELBOW"]].y},
      {x: keypoints[POINTS["LEFT_SHOULDER"]].x, y: keypoints[POINTS["LEFT_SHOULDER"]].y},
      {x: keypoints[POINTS["LEFT_HIP"]].x, y: keypoints[POINTS["LEFT_HIP"]].y},
      ) * 180 / Math.PI;

    let rightSide = find_angle(
      {x: keypoints[POINTS["RIGHT_ELBOW"]].x, y: keypoints[POINTS["RIGHT_ELBOW"]].y},
      {x: keypoints[POINTS["RIGHT_SHOULDER"]].x, y: keypoints[POINTS["RIGHT_SHOULDER"]].y},
      {x: keypoints[POINTS["RIGHT_HIP"]].x, y: keypoints[POINTS["RIGHT_HIP"]].y},
      ) * 180 / Math.PI;

    // console.log(rightSide, leftSide);
    if (angleRight > 160 && angleLeft > 160){
      setPrompt("down");
      skeletonColor = 'rgb(0,255,0)';
      return;
    }
    else if (angleRight < 45 && angleLeft < 45 && skeletonColor != 'rgb(255,255,255)') {
      setPrompt("up");
      skeletonColor = 'rgb(255,255,255)';
      setCounter(counter => counter + 1);  
      return;
    } 
  }

  async function lunge(keypoints){
    if (keypoints[POINTS["RIGHT_HIP"]].score < 0.45 || keypoints[POINTS["LEFT_HIP"]].score < 0.45){
      setPrompt("Adjust your camera");
      skeletonColor = 'rgb(255,255,255)';
      return;
    }
    let angleRight = find_angle(
      {x: keypoints[POINTS["RIGHT_HIP"]].x, y: keypoints[POINTS["RIGHT_HIP"]].y},
      {x: keypoints[POINTS["RIGHT_KNEE"]].x, y: keypoints[POINTS["RIGHT_KNEE"]].y},
      {x: keypoints[POINTS["RIGHT_ANKLE"]].x, y: keypoints[POINTS["RIGHT_ANKLE"]].y},
      ) * 180 / Math.PI;

    let angleLeft = find_angle(
      {x: keypoints[POINTS["LEFT_HIP"]].x, y: keypoints[POINTS["LEFT_HIP"]].y},
      {x: keypoints[POINTS["LEFT_KNEE"]].x, y: keypoints[POINTS["LEFT_KNEE"]].y},
      {x: keypoints[POINTS["LEFT_ANKLE"]].x, y: keypoints[POINTS["LEFT_ANKLE"]].y},
      ) * 180 / Math.PI;
      // setPrompt("Please correct your form")
      if(angleRight > 100 && angleLeft > 100) {
        setPrompt("Please correct your form")
        skeletonColor = 'rgb(255,0,0)';
      } else {
        // instructions("Good job!");
        setPrompt("Correct. Hold for 15 seconds")
        skeletonColor = 'rgb(0,255,0)';
        instructions("Try to correct your posture");
      }

      if (skeletonColor == 'rgb(255,255,255)'){
        console.log("2", skeletonColor);
      }
      if (skeletonColor === 'rgb(0,255,0)'){
        console.log("1", skeletonColor);
      }
      if (skeletonColor === 'rgb(255,0,0)'){
        console.log("3", skeletonColor);
      }
  }

  useEffect(() => {
    runMovenet();
  }, []);
  
  const size = useWindowSize();
  const isLandscape = size.height <= size.width;
  const ratio = isLandscape ? size.width / size.height : size.height / size.width;

  return (
    <div className="App">
      <header className="App-header">
        <Webcam 
            videoConstraints={{facingMode: 'user', aspectRatio: ratio}}
            id="webcam"
            ref={webcamRef}
            height={size.height}
            width={size.width}

            style={{
              position: 'absolute',
              padding: '0px',
    
            }}
          />
          <canvas
            ref={canvasRef}
            id="my-canvas"

            height={size.height}
            width={size.width}
            style={{
              position: 'absolute',
    
              zIndex: 1
            }}
          />
      </header>
    </div>
  );
}

export default Camera;