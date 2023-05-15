import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, useModal } from "../../../context/Modal";
import { fetchEditDirectMessage } from "../../../store/directMessages";
import "./chatInfo.css";

function ChatInfoModal({ chat, name, handleDeleteChat, deletedChat }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [activeTab, setActiveTab] = useState("about");
    const [isDirectMessage, setIsDirectMessage] = useState(false);
    const [newTopic, setNewTopic] = useState('');
    const workspace_id = useSelector(
        (state) => state.workspaces?.currentWorkspace?.id
    );
    // if (chat?.name) {
    //     setIsDirectMessage(false)
    // } else {
    //     setIsDirectMessage(true)
    // }
    console.log('chat in chat info model', chat)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleDelete = async () => {
        handleDeleteChat();
        closeModal();
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchEditDirectMessage(chat.id, newTopic))
            .then((data) => console.log('data in handle edit', data))
            .then(() => history.push(`/workspaces/${workspace_id}/direct_messages/${chat.id}`))
            .then(() => window.location.reload())
            .catch((error) => console.log('error in handle edit', error));
    }
    const renderAboutTab = () => {
        const { topic, description, owner } = chat;

        return (
            <div className="chat-about-tab">
                {topic && <p className="chat-topic">Topic: {topic}</p>}
                {description && (
                    <p className="chat-description">
                        Description: {description}
                    </p>
                )}
                {owner && (
                    <p className="chat-owner">
                        Created by: {owner.first_name} {owner.last_name}
                    </p>
                )}
                <form>
                    <h3>Edit DM</h3>
                    <div>
                        <label>Topic</label>
                        <input
                            type="text"
                            name="topic"
                            id="topic"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                        />
                    </div>
                    <button onClick={handleEdit}>Submit Edit</button>
                </form>
            </div>
        );
    };

    const renderMembersTab = () => {
        const { members } = chat;

        return (
            <div className="chat-members-tab">
                {members.map((member) => (
                    <p key={member.id} className="chat-member">
                        {member.first_name} {member.last_name}
                    </p>
                ))}
            </div>
        );
    };

    const renderSettingsTab = () => {
        return (
            <>
                {!deletedChat && <div className="chat-settings-tab">
                    <button onClick={handleDelete}>Delete Chat</button>
                </div>}
                {deletedChat && <div className="chat-about-tab">
                    <p className="chat-topic">Succesfuly deleted chat: {deletedChat}</p>
                </div>}
            </>
        );
    };

    return (
        <div className="chat-info">
            <div className="chat-header">
                <h1 className="chat-title">{name}</h1>
                <button className="close-button" onClick={closeModal}>
                    Close
                </button>
            </div>
            <div className="tab-navigation">
                <button
                    className={activeTab === "about" ? "active" : ""}
                    onClick={() => handleTabChange("about")}
                >
                    About
                </button>
                <button
                    className={activeTab === "members" ? "active" : ""}
                    onClick={() => handleTabChange("members")}
                >
                    Members
                </button>
                <button
                    className={activeTab === "settings" ? "active" : ""}
                    onClick={() => handleTabChange("settings")}
                >
                    Settings
                </button>
            </div>
            <div className="tab-content">
                {activeTab === "about" && renderAboutTab()}
                {activeTab === "members" && renderMembersTab()}
                {activeTab === "settings" && renderSettingsTab()}
            </div>
        </div>
    );
}
export default ChatInfoModal;
