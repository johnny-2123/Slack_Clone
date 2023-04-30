import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceSideBar from './WorkSpaceSideBar';
import IndividualChannel from '../../Channel Components/Individual Channel';
import ThreadSidebar from '../../Thread Components/ThreadSideBar';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchIndividualWorkspace } from '../../../store/workspaces';
import './IndividualWorkspace.css'
import channels, { fetchChannels } from '../../../store/channels';


function IndividualWorkspace() {
    const { workspaceId } = useParams()
    console.log(`workspaceId:::::::::`, workspaceId)

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetchChannels(workspaceId))
        dispatch(fetchIndividualWorkspace(workspaceId))
    }, [dispatch, workspaceId])

    const currentWorkspace = useSelector(state => {
        return state.workspaces.currentWorkspace
    })

    console.log(`currentWorkspace*********************************:`, currentWorkspace)

    // const channels = useSelector(state => {
    //     return state.channels.workspaceChannels
    // })
    // console.log(`channels**********:`, channels)

    return (
        <div className='IndividualWorkspaceMainDiv'>
            <WorkspaceSideBar />

        </div>

    )

}

export default IndividualWorkspace
