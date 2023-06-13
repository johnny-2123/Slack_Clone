import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import "./chat.css";
import ChatInfoModal from "./ChatInfoModal";
import OpenModalButton from "../OpenModalButton";
import { fetchAddChannelMessage, fetchUpdateChannelMessage } from "../../store/channels";
import { fetchAddDirectMessage } from "../../store/directMessages";

function ChatComponent({
    messages,
    setMessages,
    sendMessageType,
    content,
    setContent,
    name,
    chat,
    handleDeleteChat,
    deletedChat,
}) {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session?.user);

    const handleSendMessage = async (event) => {
        event.preventDefault();

        let data;
        if (sendMessageType === "direct") {
            data = await dispatch(fetchAddDirectMessage(chat.id, content)).catch(
                (data) => console.log(data)
            );
        } else if (sendMessageType === "channel") {
            data = await dispatch(fetchAddChannelMessage(chat.id, content)).catch(
                (data) => console.log(data)
            );
        }

        if (data?.error) {
            // Handle the error
        } else {
            setContent("");
            const newMessage = await data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const [editingMessage, setEditingMessage] = useState(null);
    const [editContent, setEditContent] = useState("");

    const handleEditMessage = async (newContent, messageId) => {
        try {
            const updatedMessage = await dispatch(
                fetchUpdateChannelMessage(messageId, newContent)
            );

            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message?.id === updatedMessage?.id ? updatedMessage : message
                )
            );
        } catch (error) {
            // Handle the error
        } finally {
            setEditingMessage(null);
        }
    };

    const repliesMapped = (replies) => {
        return replies?.map((reply, idx) => (
            <div className="individualMessageDiv" key={idx}>
                <div className="messageSenderProfilePicDiv">
                    <img
                        src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png"
                        className="messageSenderProfilePic"
                        alt="pfp"
                    />
                </div>
                <div className="messageDetailsDiv">
                    <div className="messageSenderNameAndTimeStampDiv">
                        <h4 className="messageSenderName">
                            {reply?.user?.first_name} {reply?.user?.last_name}
                        </h4>
                        <h5 className="messageTimestamp">{reply?.timestamp}</h5>
                    </div>
                    <p>{reply?.content}</p>
                    <div className="repliesDiv">
                        {reply?.replies?.length > 0 && repliesMapped(reply.replies)}
                    </div>
                </div>
            </div>
        ));
    };

    useEffect(() => {
        const newSocket = io({ pingTimeout: null, autoConnect: true });
        setSocket(newSocket);

        newSocket.on("chat", (chat) => {
            const exists = messages.some((message) => message.id === chat.id);
            if (!exists) {
                setMessages((prevMessages) => [...prevMessages, chat]);
            }
        });

        newSocket.on("message_update", (updatedMessage) => {
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.id === updatedMessage.id ? updatedMessage : message
                )
            );
        });

        return () => {
            newSocket.disconnect();
        };
    }, [messages, setMessages]);

    useEffect(() => {
        if (chat?.id && socket) {
            socket.emit("join", { room: `chat-${chat.id}` });
        }

        return () => {
            if (chat?.id && socket) {
                socket.emit("leave", { room: `chat-${chat.id}` });
            }
        };
    }, [chat?.id, socket, chat]);


    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const messagesMapped = messages
        ?.filter((message) => !message.parent_id)
        ?.map((message, idx) => {
            const messageLoaded = message?.content;
            const userIsMessageSender = message?.user?.id === sessionUser?.id;

            if (message.parent_id) {
                return null;
            }

            const isEditing = editingMessage === message.id;

            const handleEditSubmit = (e) => {
                e.preventDefault();
                handleEditMessage(editContent, message.id);
            };

            const handleEditButtonClick = () => {
                setEditingMessage(message.id);
                setEditContent(message.content);
            };

            return (
                messageLoaded && (
                    <div className="individualMessageDiv" key={idx}>
                        <div className="messageSenderProfilePicDiv">
                            <img
                                src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png"
                                className="messageSenderProfilePic"
                                alt="pfp"
                            />
                        </div>
                        <div className="messageDetailsDiv">
                            <div className="messageSenderNameAndTimeStampDiv">
                                <h4 className="messageSenderName">
                                    {message?.user?.first_name} {message?.user?.last_name}
                                </h4>
                                <h5 className="messageTimestamp">{message?.timestamp}</h5>
                            </div>
                            {isEditing ? (
                                <form
                                    className="editMessageForm"
                                    onSubmit={handleEditSubmit}
                                >
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="saveEditButton">
                                        Save
                                    </button>
                                </form>
                            ) : (
                                <p>{message?.content}</p>
                            )}
                            <div className="repliesDiv">
                                {message?.replies?.length > 0 && repliesMapped(message.replies)}
                            </div>
                            {userIsMessageSender && !isEditing && (
                                <button
                                    className="editButton"
                                    onClick={handleEditButtonClick}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                )
            );
        });

    return (
        <div className="chatComponentDiv">
            <OpenModalButton
                id="ChatTitle"
                modalComponent={
                    <ChatInfoModal
                        chat={chat}
                        name={name}
                        handleDeleteChat={handleDeleteChat}
                    />
                }
                buttonText={name}
            />
            <div className="messagesMainDiv">
                {messagesMapped}
                <div ref={messagesEndRef} />
            </div>
            <form className="sendMessageForm" onSubmit={handleSendMessage}>
                <input
                    className="sendMessageInput"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className="sendMessageButton" type="submit">
                    <i className="fa-solid fa-paper-plane" />
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;
