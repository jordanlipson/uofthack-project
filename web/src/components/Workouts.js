import React from "react";
import "./Workouts.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BicepCurl from "./BicepCurl";
import Lunge from "./Lunge";
import ShoulderPress from "./ShoulderPress";
import Squat from "./Squat";
import Plank from "./Plank"

const Workouts = () => {
    const navigate = useNavigate();

    function handleClick(data) {
        navigate("/camera", { state: { exercise: data } })
    }

    return (
        <div className="workouts" id="workouts">
            <h3>How are you moving today?</h3>
            <div className="container">
                <Stack direction="column" spacing={2.5}>
                    <Button style={{backgroundColor:'grey' }} className="button" variant="contained" onClick={()=>handleClick("bicep")} startIcon={<BicepCurl />}>Bicep Curl</Button>
                    <Button style={{backgroundColor:'grey' }} className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<Lunge />}>Lunge</Button>
                    <Button style={{backgroundColor:'grey' }} className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<ShoulderPress />}>Shoulder Overhead Press</Button>
                    <Button style={{backgroundColor:'grey' }} className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<Squat />}>Squat</Button>
                    <Button style={{backgroundColor:'grey' }} className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<Plank />}>Plank</Button>
                </Stack>
            </div>
        </div>
    )
}

// const Workouts = () => {
//     const navigate = useNavigate();

//     function handleClick(data) {
//         navigate("/camera")
        
//     }

    // return (
    //     <div className="workouts" id="workouts">
    //         <h3>How are you moving today?</h3>
    //         <div className="container">
    //             <Stack direction="column" spacing={2.5}>
    //                 <Button className="button" variant="contained" onClick={handleClick} startIcon={<BicepCurl />}>Bicep Curl</Button>
    //                 <Button className="button" variant="contained" onClick={handleClick} startIcon={<Lunge />}>Lunge</Button>
    //                 <Button className="button" variant="contained" startIcon={<OverheadShoulderPress />}>Overhead Shoulder Press</Button>
    //                 <Button className="button" variant="contained" startIcon={<Squat />}>Squat</Button>
    //                 <Button className="button" variant="contained" startIcon={<Plank />}>Plank</Button>
    //             </Stack>
    //         </div>
    //     </div>
    // )
// }


export default Workouts;