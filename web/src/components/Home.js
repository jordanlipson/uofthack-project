import React from 'react';
import "./Home.css"

import Button from '@mui/material/Button';
import Workouts from "./Workouts.js"
import Logo from '../images/core_logo_secondary.svg';

const Home = () => {
    const scroll  = () => {
        const element = document.getElementById('workouts');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div>
            <div className='home' id='home'>
                <h1>Welcome to Core</h1>
                <img src={Logo} width="80%" />
                <div className='bottom'>
                    <Button id='startButton' variant="contained" onClick={scroll}>Get Started</Button>
                </div>
            </div>
            <div id="workouts">
                <Workouts />    
            </div>
        </div>
    )
}

export default Home;