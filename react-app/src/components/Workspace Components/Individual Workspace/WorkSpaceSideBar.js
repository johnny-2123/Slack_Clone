import React, { useEffect, useState } from 'react';
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceMembers } from '../../../store/workspaces';
import './WorkspaceSideBar.css'

function WorkspaceSideBar({ channels, url }) {
    const { workspaceId } = useParams()
    console.log(`workspaceId in workspace sidebar component:`, workspaceId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
    }, [dispatch])


    const workspaceMembers = useSelector(state => {
        return state.workspaces.currentWorkspaceMembers
    })
    console.log(`workspaceMembers in workspace sidebar:`, workspaceMembers)

    let channelsMapped = channels?.map((channel, idx) => {

        return (
            <div key={idx}>
                <NavLink to={`${url}/channels/${channel.id}`} >{channel.name}</NavLink>
            </div>
        )
    })

    let membersMapped = workspaceMembers?.map((member, idx) => {

        return (
            <div className='workspaceSidebarMemberDiv' key={idx}>
                <p className='workspaceSidebarMemberUsername'>{member.username}</p>
            </div>
        )
    })


    return (
        <div className='workspaceSideBarMainDiv'>
            <h1>Workspace Sidebar</h1>
            <div className='membersListDiv'>
                {membersMapped}
            </div>
            <div className='channelsListDiv'>
                {channelsMapped}
            </div>
        </div>

    )

}

export default WorkspaceSideBar
