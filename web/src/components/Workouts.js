import React from "react";
import "./Workouts.css"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import BicepCurl from "./BicepCurl";
import Lunge from "./Lunge";

const Workouts = () => {
    return (
        <div className="workouts" id="workouts">
            <h3>How are you moving today?</h3>
            <div className="container">
                <Stack direction="column" spacing={2}>
                    <Button className="button" variant="contained" href="/camera" startIcon={<BicepCurl />}>Bicep Curl</Button>
                    <Button className="button" variant="contained" startIcon={<Lunge />}>Lunge</Button>
                    <Button className="button" variant="contained" startIcon={<BicepCurl />}>Shoulder Overhead Press</Button>
                    <Button className="button" variant="contained" startIcon={<BicepCurl />}>Squat</Button>
                    <Button className="button" variant="contained" startIcon={<BicepCurl />}>Plank</Button>
                </Stack>
            </div>
        </div>
    )
}

export default Workouts;