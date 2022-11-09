import React from 'react'
import { Link } from 'react-router-dom';
import homeImage from '../images/home3.jpg';
import './HomeScreen.css'
const HomeScreen = () => {
    return (
        <div style={{ backgroundImage: `url(${homeImage})`, minHeight: "95vh" }}
            className="homeDiv">
            <div className='homeInside'>
                <Link>
                    <button>Object Detection</button>
                </Link>
                <br />
                <br />
                <Link to='/upload'>
                    <button>Image Captioning</button>
                </Link>
            </div>


        </div>
    )
}

export default HomeScreen