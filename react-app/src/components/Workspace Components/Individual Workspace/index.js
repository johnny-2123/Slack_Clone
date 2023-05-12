import React, { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkspaceSideBar from "../Workspace Sidebar/WorkSpaceSideBar";
import WorkspaceMembers from "../WorkspaceMembers";
import IndividualChannel from "../../Channel Components/Individual Channel";
import ThreadSidebar from "../../Thread Components/ThreadSideBar";
import IndividualDirectMessage from "../../DirectMessage Components/Individual Direct Message";
import EditWorkspace from "../Edit Workspace";
import { Route, Switch } from "react-router-dom";
import {
    fetchIndividualWorkspace,
    clearWorkspaceStore,
} from "../../../store/workspaces";
import {
    fetchDirectMessages,
    clearDirectMessages,
} from "../../../store/directMessages";
import { fetchChannels, clearChannels } from "../../../store/channels";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./IndividualWorkspace.css";
import "../Workspace Sidebar/WorkSpaceSideBar";

function IndividualWorkspace() {
    const { workspaceId } = useParams();
    console.log(`workspaceId:`, workspaceId);

    const { url, path } = useRouteMatch(`/workspaces/${workspaceId}`);

    const dispatch = useDispatch();
    const currentWorkspace = useSelector((state) => {
        return state.workspaces.currentWorkspace;
    });

    useEffect(() => {
        dispatch(fetchIndividualWorkspace(workspaceId));
        dispatch(fetchDirectMessages(workspaceId));
        dispatch(fetchChannels(workspaceId));

        return () => {
            dispatch(clearWorkspaceStore());
            dispatch(clearDirectMessages());
            dispatch(clearChannels());
        };
    }, [dispatch, workspaceId]);

    const channels = useSelector((state) => {
        return state.channels?.workspaceChannels;
    });

    const directMessages = useSelector((state) => {
        return state.directMessages?.currentDirectMessages;
    });

    return (
        <div className="IndividualWorkspaceMainDiv">
            <WorkspaceSideBar
                channels={channels}
                url={url}
                directMessages={directMessages}
                currentWorkspace={currentWorkspace}
            />
            <Switch>
                <Route path={`${path}/edit`}>
                    <EditWorkspace workspaceId={workspaceId} />
                </Route>
                <Route path={`${path}/channels/:channelId`}>
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
                    <Redirect to={`${path}/members`} />
                </Route>
            </Switch>
        </div>
    );
}

export default IndividualWorkspace;
