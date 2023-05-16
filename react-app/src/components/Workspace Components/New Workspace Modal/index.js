import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddWorkspace } from "../../../store/workspaces";
import { useModal } from "../../../context/Modal";
import "./NewWorkspaceModal.css";
import { useHistory } from "react-router-dom";

function AddWorkspaceModal() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workspace = {
            name,
            description,
            imageUrl,
        };
        const data = await dispatch(fetchAddWorkspace(workspace)).catch(
            (data) => setErrors(Object.values(data.errors))
        );
        if (data.errors) {
            // console.log(`data above setErrors in handle submit for new workspace modal`, Object.values(data.errors))
            setErrors(Object.values(data.errors));
        } else {
            closeModal();
            history.push(`/workspaces/${data.id}`);
        }
    };
    return (
        <div className="lfform-container">
            <h1>Create Workspace</h1>
            <form onSubmit={handleSubmit}>
                <ul className="lfform-errors">
                    {errors.map((error, idx) => (
                        <li key={idx} className="lfform-error">
                            {error}
                        </li>
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
                        required
                    />
                </div>
                <button type="submit" className="lfform-button">
                    Create Workspace
                </button>
            </form>
        </div>
    );
}

export default AddWorkspaceModal;
