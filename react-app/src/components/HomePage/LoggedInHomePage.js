import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserWorkspaces } from '../../store/workspaces'
import './LoggedIn.css';

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch()

    console.log(`sessionuser:`, sessionUser)

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchUserWorkspaces(sessionUser?.id));
        setLoaded(true)
    }, [dispatch, sessionUser?.id])

    const workspaces = useSelector(state => {
        return state.workspaces?.userWorkspaces
    });

    let workspacesArr = workspaces?.map((workspace, idx) => {
        let channelId = workspace?.channels[0]?.id
        return (
            <div key={workspace.id} className="individualWorkspaceDiv"  >
                <div className="individualWorkspaceLeftDiv">
                    <img src={'https://res.cloudinary.com/dkul3ouvi/image/upload/v1682914339/photo-1517048676732-d65bc937f952_tbpyzn.jpg'} alt={workspace?.name} />
                    <div className="individualWorkspaceDetails">
                        <h2>{workspace?.name}</h2>
                        <h3>{workspace?.members.length} Members</h3>
                    </div>
                </div>
                <NavLink to={`workspaces/${workspace?.id}/channels/${channelId}`} className="launchWorkSpaceLink">
                    Launch Slack
                </NavLink>
            </div>
        )
    })


    return (
        < div className='homePageLoggedInMainDiv'>
            <h1>Welcome Back {sessionUser?.username}</h1>
            {loaded && (workspaces[0]?.name !== undefined) && <div className='workspacesDiv'>
                <div>
                    <h2 className='workspacesHeaderDiv'>Workspaces for {sessionUser?.email}</h2>
                </div>
                {workspacesArr}
            </div>}
        </div >

    );
};

export default LoggedInUserHomePage;
