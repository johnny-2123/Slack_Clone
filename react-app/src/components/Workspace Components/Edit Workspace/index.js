import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateWorkspace } from '../../../store/workspaces';
import OpenModalButton from "../../OpenModalButton"
import DeleteWorkspace from '../Delete Workspace';
import './EditWorkspace.css';

function EditWorkspace() {
    const dispatch = useDispatch();

    const workspace = useSelector(state => {
        return state?.workspaces?.currentWorkspace
    })


    const [name, setName] = useState(workspace?.name)
    const [description, setDescription] = useState(workspace?.description)
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {

    }, [dispatch, workspace])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedWorkspace = {
            name,
            description,
            imageUrl
        }

        const data = await dispatch(fetchUpdateWorkspace(updatedWorkspace, workspace.id))
            .catch(data => setErrors(Object.values(data.errors)))
        if (data.errors) {
            setErrors(Object.values(data.errors))
        }
    }

    return (
        <>
            <div className='WorkspaceMembersMainDiv'>
                <h1 id='ChannelTitle'>Edit Workspace</h1>
                <form onSubmit={handleSubmit} id='editWorkspaceForm'>
                    <ul className="lfform-errors">
                        {errors.map((error, idx) => (
                            <li key={idx} className="lfform-error">{error}</li>
                        ))}
                    </ul>
                    <div className="lfform-input">
                        <label htmlFor="workspaceName">name</label>
                        <input
                            type="text"
                            name="workspaceName"
                            id="workspaceName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="lfform-input">
                        <label htmlFor="workspaceDescription">description</label>
                        <input
                            type="text"
                            name="workspaceDescription"
                            id="workspaceDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="lfform-input">
                        <label htmlFor="workspaceImageUrl">image url</label>
                        <input
                            type="text"
                            name="workspaceImageUrl"
                            id="workspaceImageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}

                        />
                    </div>
                    <button type="submit" className="lfform-button">Update Workspace</button>

                </form>
                <div className='DeleteWorkspaceButtonDiv'>
                    <OpenModalButton className="DeleteWorkspaceOpenModalButton" buttonText={'Delete Workspace'} modalComponent={<DeleteWorkspace />} />
                </div>
            </div>

        </>
    )
}


export default EditWorkspace
