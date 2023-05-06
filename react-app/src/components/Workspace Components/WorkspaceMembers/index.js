import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceMembers.css'
import { fetchWorkspaceMembers, fetchRemoveWorkspaceMember, fetchAddWorkspaceMember } from '../../../store/workspaces';

function WorkspaceMembers() {

    const { workspaceId } = useParams()
    console.log(`workspaceId in workspace sidebar component:`, workspaceId)

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session?.user);
    const currentWorkspace = useSelector(state => state.workspaces?.currentWorkspace)

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
        sessionUser?.id === currentWorkspace.owner?.id ? setUserIsOrganizer(true) : setUserIsOrganizer(false)
        // setLoaded(true)
    }, [sessionUser, currentWorkspace,dispatch,workspaceId])



    const [userIsOrganizer, setUserIsOrganizer] = useState(false);
    // const [loaded, setLoaded] = useState(false)
    const [newUserEmail, setNewUserEmail] = useState('')

    const handleAddMember = (event) => {
        event.preventDefault()
        dispatch(fetchAddWorkspaceMember(workspaceId, newUserEmail))
        setNewUserEmail('')
    }

    const handleDeleteMember = (memberId) => {
        dispatch(fetchRemoveWorkspaceMember(workspaceId, memberId))
    }

    const workspaceMembers = useSelector(state => {
        return state.workspaces.currentWorkspaceMembers
    })
    console.log(`workspaceMembers in workspace members comoponent:`, workspaceMembers)

    let membersMapped = workspaceMembers?.map((member, idx) => {

        return (
            <div className='WorkspaceMemberIndividualDiv' key={idx}>
                <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' alt='pfp' />
                <div className='workspaceMemberInfoDiv'>
                    <h4 className='workspaceSidebarMemberUsername'>{member?.username}</h4>
                    {userIsOrganizer && <button onClick={() => handleDeleteMember(member?.id)}>Remove</button>}
                </div>
            </div>
        )
    })

    return (
        <div id='WorkspaceMembersMainDiv'>
            <h1 id='ChannelTitle'>People</h1>
            <form className='addWorkspaceMemberForm' onSubmit={handleAddMember}>
                <label htmlFor="email">Add Member </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder='enter user email'
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
            <div className='WorkspaceMembersSubDiv'>
                {membersMapped}
            </div>
        </div>

    )
}

export default WorkspaceMembers
