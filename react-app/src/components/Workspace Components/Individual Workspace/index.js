import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceSideBar from '../Workspace Sidebar/WorkSpaceSideBar';
import WorkspaceMembers from '../WorkspaceMembers'
import IndividualChannel from '../../Channel Components/Individual Channel';
import ThreadSidebar from '../../Thread Components/ThreadSideBar';
import IndividualDirectMessage from '../../DirectMessage Components/Individual Direct Message'
import EditWorkspace from '../Edit Workspace'
import { Route, Switch } from "react-router-dom";
import { fetchIndividualWorkspace } from '../../../store/workspaces';
import { fetchDirectMessages } from '../../../store/directMessages';
import './IndividualWorkspace.css'
import '../Workspace Sidebar/WorkSpaceSideBar'
import { fetchChannels } from '../../../store/channels';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function IndividualWorkspace() {
    const { workspaceId } = useParams()
    console.log(`workspaceId:`, workspaceId)

    const { url, path } = useRouteMatch(`/workspaces/${workspaceId}`)

    const dispatch = useDispatch()

    const [isChannelsLoaded, setIsChannelsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchIndividualWorkspace(workspaceId))
        dispatch(fetchDirectMessages(workspaceId))
        dispatch(fetchChannels(workspaceId))
            .then(() => {
                // set isChannelsLoaded to true when channels are loaded
                setIsChannelsLoaded(true);
            });
    }, [dispatch, workspaceId])

    // const currentWorkspace = useSelector(state => {
    //     return state.workspaces?.currentWorkspace
    // })
    // console.log(`currentWorkspace*:`, currentWorkspace)

    const channels = useSelector(state => {
        return state.channels?.workspaceChannels
    })
    // console.log(`channels**********:`, channels)

    const directMessages = useSelector(state => {
        return state.directMessages.currentDirectMessages
    })

    return (

        <div className='IndividualWorkspaceMainDiv'>
            <WorkspaceSideBar channels={channels} url={url} directMessages={directMessages} />
            <Switch>
                <Route path={`${path}/edit`}>
                    <EditWorkspace workspaceId={workspaceId} />
                </Route>
                <Route path={`${path}/channels/:channelId`} >
                    <IndividualChannel />
                </Route>
                <Route path={`/channels/:channelId/threads/:threadId`}>
                    <ThreadSidebar />
                </Route>
                <Route path={`${path}/members`}>
                    <WorkspaceMembers workspaceId={workspaceId} />
                </Route>
                <Route path={`${url}/direct_messages/:directMessageId`}>
                    <IndividualDirectMessage />
                </Route>
                <Route path={`${path}/`}>
                    {<Redirect to={`${path}/members`} />}
                </Route>
            </Switch>
        </div>

    )

}

export default IndividualWorkspace
