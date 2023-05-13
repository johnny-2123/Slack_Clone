import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import ChatInfoModal from "./ChatInfoModal";
import OpenModalButton from "../OpenModalButton";
import io from "socket.io-client";

// import { io } from 'socket.io-client';
// let socket;

function ChatComponent({
    messages,
    setMessages,
    handleSendMessage,
    content,
    setContent,
    name,
    chat,
    handleDeleteChat,
}) {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);
    console.log("chat in chat component", chat)

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
        const newSocket = io();
        setSocket(newSocket);
        socketRef.current = newSocket;

        // listen for chat events
        newSocket.on("chat", (chat) => {
            // when we receive a chat, add it into our messages array in state
            setMessages((messages) => [...messages, chat]);
        });

        // when component unmounts, disconnect
        return () => {
            newSocket.disconnect();
        };
    }, [setMessages]);

    const chatId = chat.id;

    useEffect(() => {
        if (chat && chat.id) {
            socket.emit("join", { room: `chat-${chat.id}` });
        }

        return () => {
            if (chat && chat.id) {
                socket.emit("leave", { room: `chat-${chat.id}` });
            }
        };
    }, [chat?.id]);

    const messagesMapped = messages?.map((message, idx) => {
        const messageLoaded = message?.content;

        if (message.parent_id) {
            return null;
        }

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
                        <p>{message?.content}</p>
                        <div className="repliesDiv">
                            {message?.replies?.length > 0 &&
                                repliesMapped(message.replies)}
                        </div>
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
