import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoggedInUserHomePage from './LoggedInHomePage';
import NotLoggedInUserHomePage from './NotLoggedInHomePage';
import './HomePage.css';

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (sessionUser?.username) {
            setLoggedIn(true)

        } else {
            setLoggedIn(false)
        }
    }, [sessionUser])

    console.log(`sessionUserindex:`, sessionUser)

    console.log(`userLoggedin?:`, loggedIn)

    return (
        <>
            {loggedIn && <LoggedInUserHomePage sessionUser={sessionUser} />}
            {!loggedIn && <NotLoggedInUserHomePage />}
        </>
    );
};

export default HomePage;
