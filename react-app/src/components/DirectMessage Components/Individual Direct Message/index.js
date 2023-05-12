import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIndividualDM,
    fetchAddDirectMessage,
} from "../../../store/directMessages";
import ChatComponent from "../../ChatComponent";
// import socket from '../../utils/socket'; // Import the socket instance

import { io } from 'socket.io-client';
let socket;

function IndividualDirectMessage() {
    const { directMessageId } = useParams();

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session?.user);
    const currentDM = useSelector(
        (state) => state?.directMessages?.currentIndividualDM
    );
    const dmMessages = useSelector(
        (state) => state?.directMessages?.currentIndividualDM?.messages
    );

    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const data = await dispatch(
            fetchAddDirectMessage(directMessageId, content)
        ).catch((data) => console.log(data));
        if (data.error) {
            console.log(
                `data above setErrors in handle submit for new message in IndividualDirectMessage`,
                data.error
            );
        } else {
            setContent("");
        }
    };

    useEffect(() => {
        // Fetch the individual direct message
        dispatch(fetchIndividualDM(directMessageId));
    }, [dispatch, directMessageId]);

    useEffect(() => {
        // Update the local messages state when dmMessages changes
        setMessages(dmMessages);
    }, [dmMessages]);

    useEffect(() => {
        // Listen for 'message' event from the server and update messages state
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message'); // Clean up the event listener
        };
    }, []);

    useEffect(() => {
        // Emit 'joinDirectMessage' event to server when directMessageId changes
        socket.emit('joinDirectMessage', directMessageId);

        return () => {
            // Emit 'leaveDirectMessage' event when component unmounts
            socket.emit('leaveDirectMessage', directMessageId);
        };
    }, [directMessageId]);

    const names = currentDM?.users
        ?.reduce((x, user) => {
            if (user.first_name !== sessionUser.first_name) {
                x.push(user.first_name);
            }
            return x;
        }, [])
        .join(", ");

    return (
        <ChatComponent
            messages={messages}
            handleSendMessage={handleSendMessage}
            setContent={setContent}
            content={content}
            name={names}
        />
    );
}

export default IndividualDirectMessage;
