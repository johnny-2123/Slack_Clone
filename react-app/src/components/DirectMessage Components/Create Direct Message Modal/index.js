import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateIndividualDMChat } from "../../../store/directMessages";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import "./CreateIndividualDMChatModal.css";

// function CreateIndidualDMChatModal({ currentWorkspace }) {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const [topic, setTopic] = useState("");
//     const [newChatMembers, setNewChatMembers] = useState([]);
//     const [filteredMembers, setFilteredMembers] = useState([]);
//     console.log('new chat members ', newChatMembers)

//     const [searchText, setSearchText] = useState("");
//     const [errors, setErrors] = useState([]);
//     const { closeModal } = useModal();

//     const workspace_id = currentWorkspace?.id;
//     const { currentWorkspaceMembers } = useSelector(
//         (state) => state.workspaces
//     );

//     // currentWorkspaceMembers example array
//     //  [
//     //     {
//     //         "email": "demo@aa.io",
//     //         "first_name": "Demo",
//     //         "id": 1,
//     //         "last_name": "User",
//     //         "username": "Demo"
//     //     },
//     //     {
//     //         "email": "luke@aa.io",
//     //         "first_name": "Luke",
//     //         "id": 4,
//     //         "last_name": "Skywalker",
//     //         "username": "luke"
//     //     },
//     //     {
//     //         "email": "leia@aa.io",
//     //         "first_name": "Leia",
//     //         "id": 5,
//     //         "last_name": "Organa",
//     //         "username": "leia"
//     //     },
//     //     {
//     //         "email": "han@aa.io",
//     //         "first_name": "Han",
//     //         "id": 6,
//     //         "last_name": "Solo",
//     //         "username": "han"
//     //     }
//     // ]

//     console.log(`currentWorkspaceMembers in create individual dm chat modal`, currentWorkspaceMembers)

//     const filteredCurrentWorkspaceMembers = (searchText) => {

//         const filtered = currentWorkspaceMembers.filter((member) =>
//             member.username.toLowerCase().includes(searchText.toLowerCase()) ||
//             member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
//             member.last_name.toLowerCase().includes(searchText.toLowerCase()))
//         setFilteredMembers(filtered)
//     }


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const directMessageChat = {
//             topic,
//             workspace_id
//         }
//     }

//     return (
//         <div className="lfform-container">
//             <h1>Create New Direct Message</h1>
//             <form onSubmit={handleSubmit}>
//                 <ul className="lfform-errors">
//                     {errors.map((error, idx) => (
//                         <li key={idx} className="lfform-error">
//                             {error}
//                         </li>
//                     ))}
//                 </ul>

//                 <div className="lfform-input">
//                     <label htmlFor="topic">topic</label>
//                     <input
//                         type="text"
//                         name="topic"
//                         id="topic"
//                         value={topic}
//                         onChange={(e) => setTopic(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="lfform-input">
//                     <label htmlFor="newChatMembers">members</label>
//                     {/* let users search for a member in currentWorkspaceMembers and display a list of filtered currentWorkspaceMembers, below the search input, that have a username, first_name, or last_name like the value of the searchText. The list should update in real time as users type. if a user selects a member in the filtered currentWorkspaceMembers list, that user should be added to the newChatMembers array */}
//                     <input
//                         type='search'
//                         name="newChatMembers"
//                         id="newChatMembers"
//                         // value={searchText}
//                         onChange={(e) => {
//                             { filteredCurrentWorkspaceMembers(e.target.value) }
//                         }}
//                         required
//                     />
//                     {filteredMembers.length > 0 && (
//                         <ul className="member-list">
//                             {filteredCurrentWorkspaceMembers.map((member) => (
//                                 <li key={member.id}>{member.username}</li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </form>

//         </div>
//     )

// }

function CreateIndividualDMChatModal() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [topic, setTopic] = useState("");
    const [newChatMembers, setNewChatMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    console.log('new chat members ', newChatMembers)

    const [searchText, setSearchText] = useState("");
    const [searchErrors, setSearchErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const workspace_id = useSelector(
        (state) => state.workspaces?.currentWorkspace?.id
    );
    console.log('workspace id in new dm chat modal ', workspace_id)
    const currentWorkspaceMembers = useSelector(
        (state) => state.workspaces?.currentWorkspace?.members
    );
    console.log('current workspace members', currentWorkspaceMembers)

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
        console.log('searchText ', searchText)
        let filtered = currentWorkspaceMembers.filter((member) => {
            console.log('member ', member)
            return (
                member.username.toLowerCase().includes(searchText.toLowerCase()) ||
                member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
                member.last_name.toLowerCase().includes(searchText.toLowerCase())
            )
        });
        setFilteredMembers(filtered);
    }

    const handleAddMember = (e, member) => {
        e.preventDefault();
        if (!newChatMembers.includes(member)) {
            setNewChatMembers([...newChatMembers, member]);
        }
    };

    const handleSubmitNewChatForm = async (e) => {
        e.preventDefault();
        const users = newChatMembers.map((member) => member.id);
        console.log('users ', users)
        const directMessageChat = {
            topic,
            workspace_id,
            users,
        };
        const newChat = await dispatch(fetchCreateIndividualDMChat(directMessageChat))
            .then(console.log('direct message chat created', newChat))
            .catch(
                (newChat) => (console.log('data ', newChat))
            );
        if (newChat) {
            // console.log(`data above setErrors in handle submit for new workspace modal`, Object.values(data.errors))
            setErrors(Object.values(newChat));
        } else {
            closeModal();
            history.push(`/workspaces/${workspace_id}/direct_messages/${newChat.id}`);
        }
    }

    return (
        <div className="lfform-container" id="createNewDMChatDiv">
            <h3>Create New Direct Message</h3>
            <form className="searchWorkspaceMembersForm">
                <ul className="lfform-errors">
                    {searchErrors.map((error, idx) => (
                        <li key={idx} className="lfform-error">
                            {error}
                        </li>
                    ))}
                </ul>
                <div className="memberSearchDiv">
                    <h3>To: </h3>
                    <input
                        type='search'
                        name='searchWorkspaceMembers'
                        id='searchWorkspaceMembers'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        onClick={(e) => handleSearchSubmit(e)}
                    >
                        Search
                    </button>
                    {filteredMembers.length > 0 && (
                        <ul className="searchWorkspaceMembersResultsUl">
                            {filteredMembers.map((member) => (
                                <li key={member.id}>
                                    <p>{member.username}</p>
                                    <button
                                        onClick={(e) => handleAddMember(e, member)}
                                    >Add to DM </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
            <div className="newDMMembersDiv">
                <h3>New DM Members: </h3>
                <ul>
                    {newChatMembers.map((member) => (
                        <li key={member.id}>{member.username}</li>
                    ))}
                </ul>
            </div>
            <form>
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
                <button
                    type="submit"
                    onClick={(e) => handleSubmitNewChatForm(e)}
                >Create New DM</button>
            </form>

        </div>
    );
}

export default CreateIndividualDMChatModal;
