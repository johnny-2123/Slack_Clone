import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateIndividualDMChat } from "../../../store/directMessages";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import "./CreateIndividualDMChatModal.css";

function CreateIndividualDMChatModal() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [topic, setTopic] = useState("");
    const [newChatMembers, setNewChatMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [searchErrors, setSearchErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const workspace_id = useSelector(
        (state) => state.workspaces?.currentWorkspace?.id
    );
    const currentWorkspaceMembers = useSelector(
        (state) => state.workspaces?.currentWorkspace?.members
    );

    useEffect(() => {
        const filtered = currentWorkspaceMembers.filter((member) =>
            member.username.toLowerCase().includes(searchText.toLowerCase()) ||
            member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            member.last_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredMembers(filtered);
    }, [searchText, currentWorkspaceMembers]);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        let filtered = currentWorkspaceMembers.filter((member) =>
            member.username.toLowerCase().includes(searchText.toLowerCase()) ||
            member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            member.last_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredMembers(filtered);
    };

    const handleAddMember = (e, member) => {
        e.preventDefault();
        if (!newChatMembers.includes(member)) {
            setNewChatMembers([...newChatMembers, member]);
        }
    };

    const handleSubmitNewChatForm = async (e) => {
        e.preventDefault();
        const users = newChatMembers.map((member) => member.id);
        const directMessageChat = {
            topic,
            workspace_id,
            users,
        };
        const newChat = await dispatch(fetchCreateIndividualDMChat(directMessageChat))
            .then((data) => history.push(`/workspaces/${workspace_id}/direct_messages/${data.id}`))
            .then(() => closeModal())
            .catch((data) => console.log('data ', data))
    }
    return (
        <div className="lfform-container" id="createNewDMChatDiv">
            <h3>Create New Direct Message</h3>
            <form className="searchWorkspaceMembersForm" onSubmit={handleSearchSubmit}>
                <ul className="lfform-errors">
                    {searchErrors.map((error, idx) => (
                        <li key={idx} className="lfform-error">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="memberSearchDiv">
                    <div className="searchBardiv">
                        <h3>To:</h3>
                        <input
                            type="search"
                            name="searchWorkspaceMembers"
                            id="searchWorkspaceMembers"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            required
                        />

                        <button type="submit">Search</button>
                    </div>
                    {filteredMembers.length > 0 && (
                        <ul className="searchWorkspaceMembersResultsUl">
                            {filteredMembers.map((member) => (
                                <li key={member.id}>
                                    <p>{member.username}</p>
                                    <button onClick={(e) => handleAddMember(e, member)}>Add to DM</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
            <div className="newDMMembersDiv">
                <h3>New DM Members:</h3>
                <ul>
                    {newChatMembers.map((member) => (
                        <li key={member.id}>{member.username}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmitNewChatForm}>
                <ul className="lfform-errors">
                    {errors.map((error, idx) => (
                        <li key={idx} className="lfform-error">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="lfform-input">
                    <label htmlFor="topic">topic</label>
                    <input
                        type="text"
                        name="topic"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create New DM</button>
            </form>
        </div>
    );
}

export default CreateIndividualDMChatModal;
