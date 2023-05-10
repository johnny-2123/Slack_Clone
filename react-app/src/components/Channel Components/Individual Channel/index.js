import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import './IndividualChannel.css'
import {
    fetchAddChannelMessage,
    fetchChannelMessages,
    fetchIndividualChannel,
} from "../../../store/channels";
import ChatComponent from "../../ChatComponent";

function IndividualChannel() {
    const { channelId } = useParams();

    const dispatch = useDispatch();

    const currentChannel = useSelector(
        (state) => state.channels?.currentChannel
    );
    const channelMessages = useSelector(
        (state) => state.channels?.currentChannelMessages?.Messages
    );

    const [messages, setMessages] = useState();
    const [content, setContent] = useState("");

    useEffect(() => {
        dispatch(fetchIndividualChannel(channelId));
        dispatch(fetchChannelMessages(channelId));
    }, [dispatch, channelId]);

    useEffect(() => {
        setMessages(channelMessages);
    }, [channelMessages]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const data = await dispatch(
            fetchAddChannelMessage(channelId, content)
        ).catch((data) => console.log(data));
        if (data.error) {
            console.log(
                `data above setErrors in handle submit for new message in IndividualDirectMessage`,
                data.error
            );
        } else {
            setContent("");
            const newMessage = await data;
            setMessages([...messages, newMessage]);
        }
    };

    return (
        <ChatComponent
            messages={messages}
            handleSendMessage={handleSendMessage}
            setContent={setContent}
            content={content}
            name={currentChannel.name}
        />
    );
}

export default IndividualChannel;
