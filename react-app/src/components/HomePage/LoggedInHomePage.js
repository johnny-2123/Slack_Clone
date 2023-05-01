import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWorkspaces } from '../../store/workspaces'
import './LoggedIn.css';

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch()

    console.log(`sessionuser:`, sessionUser)

    useEffect(() => {
        dispatch(fetchUserWorkspaces(sessionUser.id));
    }, [dispatch, sessionUser?.id])


    const workspaces = useSelector(state => {
        return state.workspaces.userWorkspaces
    });

    console.log(`workspacesInHomePage`, workspaces)

    const workspacesArr = workspaces.map(workspace => (
        <div key={workspace.id} className="individualWorkspaceDiv"  >
            <div className="individualWorkspaceLeftDiv">
                <img src={'https://res.cloudinary.com/dkul3ouvi/image/upload/v1682914339/photo-1517048676732-d65bc937f952_tbpyzn.jpg'} alt={workspace.name} />
                <div className="individualWorkspaceDetails">
                    <h2>{workspace.name}</h2>
                    <h3>{workspace.members.length} Members</h3>
                </div>
            </div>
            <NavLink to={`workspaces/${workspace.id}`} className="launchWorkSpaceLink">
                Launch Slack
            </NavLink>
        </div>
    ));


    return (
        <div className='homePageLoggedInMainDiv'>
            <h1>Welcome Back {sessionUser?.username}</h1>
            <div className='workspacesDiv'>
                <div>
                    <h2 className='workspacesHeaderDiv'>Workspaces for {sessionUser?.email}</h2>
                </div>
                {workspacesArr}
            </div>
        </div>
    );
};

export default LoggedInUserHomePage;
