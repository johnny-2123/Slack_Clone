import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WorkspaceMembers.css";
import {
    fetchWorkspaceMembers,
    fetchRemoveWorkspaceMember,
    fetchAddWorkspaceMember,
} from "../../../store/workspaces";

function WorkspaceMembers({ workspaceId }) {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session?.user);
    const currentWorkspace = useSelector(
        (state) => state.workspaces?.currentWorkspace
    );
    const { currentWorkspaceMembers } = useSelector(
        (state) => state.workspaces
    );
    const [errors, setErrors] = useState([]);
    const [userIsOrganizer, setUserIsOrganizer] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState("");

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId));
    }, [dispatch, workspaceId]);

    useEffect(() => {
        sessionUser?.id === currentWorkspace.owner?.id
            ? setUserIsOrganizer(true)
            : setUserIsOrganizer(false);
        if (sessionUser && currentWorkspaceMembers[0]) {
            setLoaded(true);
        }
    }, [sessionUser, currentWorkspace.owner?.id, currentWorkspaceMembers]);

    const handleAddMember = async (event) => {
        event.preventDefault();
        const data = await dispatch(
            fetchAddWorkspaceMember(workspaceId, newUserEmail)
        );
        if (data.error) {
            console.log(
                `data above setErrors in handle submit for new workspace modal`,
                data.error
            );
            setErrors(data.error);
        } else {
            setNewUserEmail("");
        }
    };

    const handleDeleteMember = (memberId) => {
        dispatch(fetchRemoveWorkspaceMember(workspaceId, memberId));
    };

    const membersMapped = currentWorkspaceMembers?.map((member, idx) => {
        return (
            <div className="WorkspaceMemberIndividualDiv" key={idx}>
                <img
                    src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png"
                    alt="pfp"
                />
                <div className="workspaceMemberInfoDiv">
                    {member?.username !== undefined && (
                        <h4 className="workspaceSidebarMemberUsername">
                            {member?.username}
                        </h4>
                    )}
                    {userIsOrganizer && sessionUser?.id !== member?.id && (
                        <button onClick={() => handleDeleteMember(member?.id)}>
                            Remove
                        </button>
                    )}
                </div>
            </div>
        );
    });

    return (
        <>
            {!loaded && <div className="WorkspaceMembersMainDiv"></div>}
            {loaded && (
                <div className="WorkspaceMembersMainDiv">
                    <h1 id="ChannelTitle">People</h1>
                    <form
                        className="addWorkspaceMemberForm"
                        onSubmit={handleAddMember}
                    >
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Add User By Email"
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            required
                        />
                        <button type="submit">
                            <i className="fa-solid fa-user-plus" />
                        </button>
                    </form>
                    <ul className="lfform-errors">
                        {errors.map((error, idx) => (
                            <li key={idx} className="lfform-error">
                                {error}
                            </li>
                        ))}
                    </ul>
                    <div className="WorkspaceMembersSubDiv">
                        {membersMapped}
                    </div>
                </div>
            )}
        </>
    );
}

export default WorkspaceMembers;
