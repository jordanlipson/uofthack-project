import React from "react";
import "./Workouts.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, HashRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import BicepCurl from "./BicepCurl";
import Lunge from "./Lunge";

const Workouts = () => {
    const navigate = useNavigate();

    function handleClick(data) {
        navigate("/camera", { state: { exercise: data } })
    }

    return (
        <div className="workouts" id="workouts">
            <h3>How are you moving today?</h3>
            <div className="container">
                <Stack direction="column" spacing={2}>
                    <Button className="button" variant="contained" onClick={()=>handleClick("bicep")} startIcon={<BicepCurl />}>Bicep Curl</Button>
                    <Button className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<Lunge />}>Lunge</Button>
                    <Button className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<BicepCurl />}>Shoulder Overhead Press</Button>
                    <Button className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<BicepCurl />}>Squat</Button>
                    <Button className="button" variant="contained" onClick={()=>handleClick("lunge")} startIcon={<BicepCurl />}>Plank</Button>
                </Stack>
            </div>
        </div>
    )
}

export default Workouts;