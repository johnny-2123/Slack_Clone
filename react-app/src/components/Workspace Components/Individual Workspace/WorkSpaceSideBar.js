import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceSideBar.css'

function WorkspaceSideBar({ channelsMapped }) {


    return (
        <div className='workspaceSideBarMainDiv'>
            <h1>Workspace Sidebar</h1>
            <div className='channelList'>
                {channelsMapped}
            </div>
        </div>

    )

}

export default WorkspaceSideBar
