import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceMembers.css'
import { fetchWorkspaceMembers, fetchRemoveWorkspaceMember, fetchAddWorkspaceMember } from '../../../store/workspaces';

function WorkspaceMembers({ url }) {

    const { workspaceId } = useParams()
    console.log(`workspaceId in workspace sidebar component:`, workspaceId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))
    }, [dispatch])

    const [newUserEmail, setNewUserEmail] = useState('')

    const handleAddMember = (event) => {
        event.preventDefault()
        const email = newUserEmail
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
                <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' />
                <div className='workspaceMemberInfoDiv'>
                    <h4 className='workspaceSidebarMemberUsername'>{member?.username}</h4>
                    <button onClick={() => handleDeleteMember(member?.id)}>Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div id='WorkspaceMembersMainDiv'>
            <h1 id='ChannelTitle'>People</h1>
            <form onSubmit={handleAddMember}>
                <label htmlFor="email">Add Member: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
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
