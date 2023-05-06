import React, { useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceMembers } from '../../../store/workspaces';
import './WorkspaceSideBar.css'

function WorkspaceSideBar({ channels, directMessages, url }) {
    const { workspaceId } = useParams()
    console.log(`workspaceId in workspace sidebar component:`, workspaceId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
      }, [dispatch, workspaceId]);

    const currentWorkspace = useSelector(state => {
        return state.workspaces.currentWorkspace
    })
    const sessionUser = useSelector(state => state.session?.user);


    let channelsMapped = channels?.map((channel, idx) => {
        return (
            <div key={idx}>
                <NavLink to={`${url}/channels/${channel.id}`} >{channel.name}</NavLink>
            </div>
        )
    })

    let directMessagesMapped = directMessages?.map((dm, idx) => {
        const names = dm?.users?.reduce((x, user) => {
            if (user.first_name !== sessionUser.first_name) {
                x.push(user.first_name);
            }
            return x;
        }, []).join(', ');
        return (
            <div key={idx}>
                <NavLink to={`${url}/direct_messages/${dm.id}`} >{names}</NavLink>
            </div>
        )
    })

    return (
        <div className='workspaceSideBarMainDiv'>
            <h1>{currentWorkspace?.name}</h1>
            <div className='channelsListDiv'>
                <NavLink to={`${url}/members`}>People</NavLink>
            </div>
            <div className='channelsListDiv'>
                {channelsMapped}
            </div>
            <div className='channelsListDiv'>
                {directMessagesMapped}
            </div>
        </div>

    )

}

export default WorkspaceSideBar
