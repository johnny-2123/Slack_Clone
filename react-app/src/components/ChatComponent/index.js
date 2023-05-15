import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./chat.css";
import ChatInfoModal from "./ChatInfoModal";
import OpenModalButton from "../OpenModalButton";
import io from "socket.io-client";
import { fetchAddDirectMessage } from "../../store/directMessages";
import { useDispatch } from "react-redux";
import {
    fetchAddChannelMessage,
    fetchDeleteChannelMessage,
    fetchUpdateChannelMessage,
} from "../../store/channels";

// import { io } from 'socket.io-client';
// let socket;

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
    // console.log('deletedChat in ChatComponent ', deletedChat)
    console.log("chat in ChatComponent ", chat);

    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session?.user);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        let data;

        if (sendMessageType === "direct") {
            // Handle sending direct message
            data = await dispatch(
                fetchAddDirectMessage(chat.id, content)
            ).catch((data) => console.log(data));
        } else if (sendMessageType === "channel") {
            // Handle sending channel message
            data = await dispatch(
                fetchAddChannelMessage(chat.id, content)
            ).catch((data) => console.log(data));
        }
        if (data.error) {
            // console.log(
            //     `data above setErrors in handle submit for new message in IndividualDirectMessage`,
            //     data.error
            // );
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

            // Update the messages state with the updated message
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message?.id === updatedMessage?.id
                        ? updatedMessage
                        : message
                )
            );
        } catch (error) {
            // Handle the error later
        } finally {
            setEditingMessage(null);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const deletedMessage = await dispatch(
                fetchDeleteChannelMessage(messageId)
            );
            setMessages((prevMessages) =>
                prevMessages.filter(
                    (message) => message.id !== deletedMessage.id
                )
            );
        } catch (error) {
            // Handle the error later
        }
    };

    const repliesMapped = (replies) => {
        return replies?.map((reply, idx) => {
            return (
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
                                {reply?.user?.first_name}{" "}
                                {reply?.user?.last_name}
                            </h4>
                            <h5 className="messageTimestamp">
                                {reply?.timestamp}
                            </h5>
                        </div>
                        <p>{reply?.content}</p>
                        <div className="repliesDiv">
                            {reply?.replies?.length > 0 &&
                                repliesMapped(reply.replies)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        // create websocket connection
        const newSocket = io({
            pingTimeout: null,
        });
        setSocket(newSocket);

        // listen for chat events
        newSocket.on("chat", (chat) => {
            // check if the chat message already exists in the messages array
            const exists = messages.some((message) => message.id === chat.id);
            if (exists) {
                return; // message already exists, no need to update state
            }

            // when we receive a new chat, add it to the messages array in state
            setMessages((prevMessages) => [...prevMessages, chat]);
        });

        // Listen for the message_update event
        newSocket.on("message_update", (updatedMessage) => {
            // Update the corresponding message in the state
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.id === updatedMessage.id ? updatedMessage : message
                )
            );
        });

        // Listen for the message_update event
        newSocket.on("message_delete", (deletedMessage) => {
            // Delete the corresponding message in the state
            setMessages((prevMessages) =>
                prevMessages.filter(
                    (message) => message.id !== deletedMessage.id
                )
            );
        });

        // when component unmounts, disconnect
        return () => {
            console.log("manually disconnecting");
            newSocket.disconnect();
        };
    }, [messages, setMessages]);

    useEffect(() => {
        if (chat && chat.id && socket) {
            socket.emit("join", { room: `chat-${chat.id}` });
        }

        return () => {
            if (chat && chat.id && socket) {
                console.log(`manually leaving room chat-${chat.id}`);
                socket.emit("leave", { room: `chat-${chat.id}` });
            }
        };
    }, [chat?.id, socket, chat]);

    const messagesMapped = messages?.map((message, idx) => {
        const messageLoaded = message?.content;
        let userIsMessageSender;
        if (message?.user?.id === sessionUser?.id) {
            userIsMessageSender = true;
        } else {
            userIsMessageSender = false;
        }

        if (message.parent_id) {
            return null;
        }

        const isEditing = editingMessage === message.id;

        const handleEditSubmit = (e) => {
            e.preventDefault();
            handleEditMessage(editContent, message.id);
        };

        const handleEditButtonClick = (message) => {
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
                                {message?.user?.first_name}{" "}
                                {message?.user?.last_name}
                            </h4>
                            <h5 className="messageTimestamp">
                                {message?.timestamp}
                            </h5>
                        </div>
                        {isEditing ? (
                            <form
                                className="editMessageForm"
                                onSubmit={handleEditSubmit}
                            >
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type="submit"
                                    className="saveEditButton"
                                >
                                    Save
                                </button>
                            </form>
                        ) : (
                            <p>{message?.content}</p>
                        )}
                        <div className="repliesDiv">
                            {message?.replies?.length > 0 &&
                                repliesMapped(message.replies)}
                        </div>
                        {userIsMessageSender && !isEditing && (
                            <>
                                <button
                                    className="editButton"
                                    onClick={() =>
                                        handleEditButtonClick(message)
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    className="DeleteButton"
                                    onClick={() =>
                                        handleDeleteMessage(message.id)
                                    }
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )
        );
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
