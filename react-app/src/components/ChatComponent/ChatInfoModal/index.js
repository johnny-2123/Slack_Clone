import { useState } from "react";
import { Modal, useModal } from "../../../context/Modal";
import "./chatInfo.css";

function ChatInfoModal({ chat, name, handleDeleteChat, deletedChat }) {
    const { closeModal } = useModal();
    const [activeTab, setActiveTab] = useState("about");

    console.log('deletedChat in chat info model', deletedChat)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleDelete = async () => {
        handleDeleteChat();
        closeModal();
    };

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
