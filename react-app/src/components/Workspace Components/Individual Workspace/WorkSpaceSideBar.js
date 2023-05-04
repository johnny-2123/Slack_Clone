import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceSideBar.css'

function WorkspaceSideBar({ channelsMapped, membersMapped }) {


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
