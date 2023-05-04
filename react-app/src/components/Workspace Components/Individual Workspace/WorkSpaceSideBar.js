import React, { useEffect, useState } from 'react';
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import './WorkspaceSideBar.css'

function WorkspaceSideBar({ members, channels, url }) {

    let channelsMapped = channels?.map((channel, idx) => {

        return (
            <div key={idx}>
                <NavLink to={`${url}/channels/${channel.id}`} >{channel.name}</NavLink>
            </div>
        )
    })



    let membersMapped = members?.map((member, idx) => {

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
