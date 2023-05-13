import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIndividualDM,
    fetchAddDirectMessage,
    fetchDeleteDirectMessage
} from "../../../store/directMessages";
import ChatComponent from "../../ChatComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function IndividualDirectMessage({ workspaceId }) {
    const { directMessageId } = useParams();

    const [deletedDirectMessage, setDeletedDirectMessage] = useState(false);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session?.user);
    const currentDM = useSelector(
        (state) => state?.directMessages?.currentIndividualDM
    );
    const dmMessages = useSelector(
        (state) => state?.directMessages?.currentIndividualDM?.messages
    );

    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        // Fetch the individual direct message
        dispatch(fetchIndividualDM(directMessageId));
    }, [dispatch, directMessageId]);

    useEffect(() => {
        // Update the local messages state when dmMessages changes
        setMessages(dmMessages);
    }, [dmMessages]);

    const [names, setNames] = useState("");

    useEffect(() => {
        // get an array of user first names, excluding the session user's name
        const userNames = currentDM?.members
            ?.reduce((x, user) => {
                if (user.first_name !== sessionUser.first_name) {
                    x.push(user.first_name);
                }
                return x;
            }, [])
            .join(", ");

        setNames(userNames);
    }, [currentDM, sessionUser]);

    const handleDeleteDirectMessage = async () => {
        const data = await dispatch(fetchDeleteDirectMessage(directMessageId))
            .catch((data) => console.log(data));
        if (data.errors) {
            console.log(`data.errors`, data)
            setErrors(data.errors)
        } else {
            setDeletedDirectMessage(data.deleted_chat);
            console.log(`deletedDirectMessage`, data.deleted_chat)
            history.push(`/workspaces/${workspaceId}/members`);
        }
    };

    return (
        <ChatComponent
            messages={messages}
            setMessages={setMessages}
            // handleSendMessage={handleSendMessage}
            sendMessageType="direct"
            setContent={setContent}
            content={content}
            name={names}
            chat={currentDM}
            handleDeleteChat={handleDeleteDirectMessage}
            deletedChat={deletedDirectMessage}
        />
    );
}

export default IndividualDirectMessage;
