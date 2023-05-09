import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './WorkspaceMembers.css'
import { fetchWorkspaceMembers, fetchRemoveWorkspaceMember, fetchAddWorkspaceMember } from '../../../store/workspaces';

function WorkspaceMembers({ workspaceId }) {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session?.user);
    const currentWorkspace = useSelector(state => state.workspaces?.currentWorkspace)
    const { currentWorkspaceMembers } = useSelector(state => state.workspaces)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(fetchWorkspaceMembers(workspaceId))

    }, [dispatch, workspaceId])

    useEffect(() => {
        sessionUser?.id === currentWorkspace.owner?.id ? setUserIsOrganizer(true) : setUserIsOrganizer(false)
        if (sessionUser && currentWorkspaceMembers) {
            setLoaded(true);
        }
    }, [dispatch, sessionUser, currentWorkspace.owner?.id, currentWorkspaceMembers, workspaceId])


    const [userIsOrganizer, setUserIsOrganizer] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [newUserEmail, setNewUserEmail] = useState('')

    const handleAddMember = async (event) => {
        event.preventDefault()
        const data = await dispatch(fetchAddWorkspaceMember(workspaceId, newUserEmail))
            .catch(data => setErrors(data.error))
        if (data.error) {
            console.log(`data above setErrors in handle submit for new workspace modal`, data.error)
            setErrors((data.error))
        } else {
        }

        setNewUserEmail('')
    }

    const handleDeleteMember = (memberId) => {
        dispatch(fetchRemoveWorkspaceMember(workspaceId, memberId))
    }


    let membersMapped = currentWorkspaceMembers?.map((member, idx) => {

        return (
            <div className='WorkspaceMemberIndividualDiv' key={idx}>
                <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' alt='pfp' />
                <div className='workspaceMemberInfoDiv'>
                    {member?.username !== undefined && <h4 className='workspaceSidebarMemberUsername'>{member?.username}</h4>}
                    {userIsOrganizer && sessionUser?.id !== member?.id && <button onClick={() => handleDeleteMember(member?.id)}>Remove</button>}
                </div>
            </div>
        )
    })

    return (
        (loaded && <div className='WorkspaceMembersMainDiv'>
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
            <ul className="lfform-errors">
                {errors.map((error, idx) => (
                    <li key={idx} className="lfform-error">{error}</li>
                ))}
            </ul>
            <div className='WorkspaceMembersSubDiv'>
                {membersMapped}
            </div>
        </div>)

    )
}

export default WorkspaceMembers
