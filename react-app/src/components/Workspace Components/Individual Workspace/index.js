import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceSideBar from './WorkSpaceSideBar';
import IndividualChannel from '../../Channel Components/Individual Channel';
import ThreadSidebar from '../../Thread Components/ThreadSideBar';
import { BrowserRouter as Route, Switch } from "react-router-dom"; import { fetchIndividualWorkspace } from '../../../store/workspaces';
import './IndividualWorkspace.css'
import './WorkspaceSideBar.css'

function IndividualWorkspace() {
    const { workspaceId } = useParams()
    console.log(`workspaceId:`, workspaceId)

    const { url, path } = useRouteMatch()
    console.log(`IndividualWorkspace url`, url)
    console.log(`IndividualWorkspace path`, path)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIndividualWorkspace(workspaceId))
    }, [dispatch])

    const currentWorkspace = useSelector(state => {
        return state.workspaces.currentWorkspace
    })
    console.log(`currentWorkspace*:`, currentWorkspace)

    const channels = currentWorkspace.channels
    console.log(`channels**********:`, channels)

    // const [workspaceWidth, setWorkspaceWidth] = useState(20);
    // const [threadWidth, setThreadWidth] = useState(20);
    const [showWorkspace, setShowWorkspace] = useState(true);
    // const [showThread, setShowThread] = useState(false);

    // const handleWorkspaceResize = (newWidth) => {
    //     if (newWidth < 10) {
    //         setShowWorkspace(false);
    //     } else {
    //         setShowWorkspace(true);
    //         setWorkspaceWidth(newWidth);
    //     }
    // };

    // const handleThreadResize = (newWidth) => {
    //     if (newWidth < 10) {
    //         setShowThread(false);
    //     } else {
    //         setShowThread(true);
    //         setThreadWidth(newWidth);
    //     }
    // };

    return (

        <div className='IndividualWorkspaceMainDiv'>
            {showWorkspace &&
                <WorkspaceSideBar channels={channels} url={url} />
            }
            <Switch>
                <Route path={`${path}/channels/:channelId`} >
                    <IndividualChannel />
                </Route>
                <Route path={`/channels/:channelId/threads/:threadId`}>
                    <ThreadSidebar />
                </Route>
            </Switch>
        </div>

    )

}

export default IndividualWorkspace
