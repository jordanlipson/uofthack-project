import React from 'react';
import "./Home.css"


import Button from '@mui/material/Button';
import Workouts from "./Workouts.js"

const Home = () => {

    return (
        // <div>
        //     <h1>Welcome to APPNAME</h1>
        //     <Link to="/camera">CAMERA</Link>
        // </div>
        <div>
            <div className='home' id='home'>
                <h1>Welcome to Core</h1>
                <div className='bottom'>
                    {/* <a href='/workouts' onClick={closeMenu} smooth={true} duration={1000} spy={true}>
                        <button id='startButton'>Get Started</button>
                    </a> */}
                    <Button id='startButton' variant="contained" href="#workouts" smooth={true} duration={1000} spy={true}>Get Started</Button>
                </div>
            </div>
            <Workouts />
        </div>
    )
}

export default Home;