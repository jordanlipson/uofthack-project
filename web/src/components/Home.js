import React from 'react';
import "./Home.css"
import Button from '@mui/material/Button';

const Home = () => {

    return (
        // <div>
        //     <h1>Welcome to APPNAME</h1>
        //     <Link to="/camera">CAMERA</Link>
        // </div>
        <div className='home' id='home'>
            <h1>Welcome to APPNAME</h1>
            <div class='bottom'>
                {/* <a href='/workouts' onClick={closeMenu} smooth={true} duration={1000} spy={true}>
                    <button id='startButton'>Get Started</button>
                </a> */}
                <Button id='startButton' variant="contained" href="#workouts" smooth={true} duration={1000} spy={true}>Get Started</Button>
            </div>
        </div>
    )
}

export default Home;