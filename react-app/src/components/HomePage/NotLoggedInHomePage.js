import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

const NotLoggedInUserHomePage = () => {

    return (
        <div className='homePageNotLoggedInMainDiv'>
            <div className='homePageTopDiv'>
                <div className='homePageTopLeftDiv'>
                    <h1 className='homePageTitle'>One platform for your team and your work</h1>
                    <ul className='homePageFeatures'>
                        <li>Connect people to the information they need</li>
                        <li>Ask questions, get caught up, and share updates without having to coordinate schedules</li>
                        <li>Help keep teams stay aligned and make decisions more quickly</li>
                    </ul>

                </div>
                <img className='homePageImage' src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1682901409/vecteezy_people-user-team-png-transparent_9664234_909_oz8x4i.png' alt='home-page' />
            </div>
            <div>
                <div className='homePageButtons'>
                    <NavLink to={'/login'} className='homePageLoginButton'>Log In</NavLink>
                    <NavLink to={'/signup'} className='homePageSignupButton'>Sign Up</NavLink>
                </div>
            </div>
            <div className='homePageBottomdiv'>
                <h3>About</h3>
            </div>
        </div>
    );
};

export default NotLoggedInUserHomePage;
