import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceSideBar from './WorkSpaceSideBar';
import IndividualChannel from '../../Channel Components/Individual Channel';
import ThreadSidebar from '../../Thread Components/ThreadSideBar';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
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

    // const channels = useSelector(state => {
    //     return state.channels.workspaceChannels
    // })
    // console.log(`channels**********:`, channels)

    console.log(`currentWorkspace*********************************:`, currentWorkspace)



    const [workspaceWidth, setWorkspaceWidth] = useState(20);
    const [threadWidth, setThreadWidth] = useState(20);
    const [showWorkspace, setShowWorkspace] = useState(true);
    const [showThread, setShowThread] = useState(false);

    const handleWorkspaceResize = (newWidth) => {
        if (newWidth < 10) {
            setShowWorkspace(false);
        } else {
            setShowWorkspace(true);
            setWorkspaceWidth(newWidth);
        }
    };

    const handleThreadResize = (newWidth) => {
        if (newWidth < 10) {
            setShowThread(false);
        } else {
            setShowThread(true);
            setThreadWidth(newWidth);
        }
    };

    return (
        <div className='IndividualWorkspaceMainDiv'>
            {showWorkspace &&
                <div className='WorkspaceSidebar' style={{ width: `${workspaceWidth}vw` }}                >
                    <WorkspaceSideBar />
                </div>
            }
            <Switch >
                <Route path={'/channels/:channelId'} >
                    <div style={{ width: `${100 - workspaceWidth - threadWidth}vw`, height: `89vw` }}>
                        <IndividualChannel />
                    </div>
                </Route>
                <Route path={`/channels/:channelId/threads?threadId`}>
                    <div style={{ width: `${threadWidth}vw` }}>
                        <ThreadSidebar />
                    </div>
                </Route>
            </Switch>
        </div>

    )

}

export default IndividualWorkspace
