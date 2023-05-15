const GET_DIRECT_MESSAGES = "direct_messages/GET_DIRECT_MESSAGES";
const GET_INDIVIDUAL_DM = "direct_messages/GET_INDIViDUAL_DM";
const ADD_DIRECT_MESSAGE = "direct_messages/ADD_DIRECT_MESSAGE";
const CLEAR_DIRECT_MESSAGES = "direct_messages/CLEAR_DIRECT_MESSAGES";
const DELETE_DIRECT_MESSAGE = "direct_messages/DELETE_DIRECT_MESSAGE";

const CREATE_INDIVIDUAL_DM_CHAT = "direct_messages/CREATE_INDIVIDUAL_DM_CHAT";

const createIndividualDMChat = (newDirectMessageChat) => ({
    type: CREATE_INDIVIDUAL_DM_CHAT,
    payload: newDirectMessageChat,
});


export const fetchCreateIndividualDMChat = (directMessageChat) => async (dispatch) => {
    console.log('directMessageChat data from frontend CreateIndidualDMChatModal react component, directMessageChat', directMessageChat)

    const response = await fetch(`/api/direct_messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(directMessageChat),
    });

    console.log('response from fetchCreateIndividualDMChatn in redux reducer', response)

    if (response.ok) {
        const newDirectMessageChat = await response.json();
        console.log('newDirectMessageChat succesful response in fetchCreateIndividualDMChat in redux reducer', newDirectMessageChat)
        dispatch(createIndividualDMChat(newDirectMessageChat));
        return newDirectMessageChat;
    } else {
        const data = await response.json();
        console.log('data error response from fetchCreateIndividualDMChat in redux reducer', data)
        return data;
    }

};

const deleteDirectMessage = (deletedDirectMessage) => ({
    type: DELETE_DIRECT_MESSAGE,
    payload: deletedDirectMessage,
});


export const fetchDeleteDirectMessage = (directMessageId) => async (dispatch) => {
    // console.log(`directMessageId in fetchDeleteDirectMessage`, directMessageId)
    const response = await fetch(`/api/direct_messages/${directMessageId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const deletedDirectMessage = await response.json();
        // console.log(`deletedDirectMessage in fetchDeleteDirectMessage`, deletedDirectMessage)
        dispatch(deleteDirectMessage(deletedDirectMessage));
        return deletedDirectMessage;
    }

}

export const clearDirectMessages = () => ({
    type: CLEAR_DIRECT_MESSAGES,
});

const addDirectMessage = (directMessage) => ({
    type: ADD_DIRECT_MESSAGE,
    payload: directMessage,
});

// add a message to a conversation between workspace users
export const fetchAddDirectMessage =
    (directMessageId, content) => async (dispatch) => {
        console.log(
            `messsage in fetchAddDirectMessage`,
            directMessageId,
            content
        );

        const response = await fetch(
            `/api/direct_messages/${directMessageId}/messages`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            }
        );
        console.log(`response from fetchAddDirectMessage`, response);

        if (response.ok) {
            const directMessage = await response.json();
            console.log(
                `data from fetchAddDirectMessage response`,
                directMessage
            );
            return directMessage;
        }
    };

const getIndividualDM = (directMessage) => ({
    type: GET_INDIVIDUAL_DM,
    payload: directMessage,
});

// get details of a single direct conversation between workspace users in a workspace
export const fetchIndividualDM = (directMessageId) => async (dispatch) => {
    const response = await fetch(`/api/direct_messages/${directMessageId}`);

    if (response.ok) {
        const directMessage = await response.json();
        dispatch(getIndividualDM(directMessage));
        return directMessage;
    }
};

const getDirectMessages = (directMessages) => ({
    type: GET_DIRECT_MESSAGES,
    payload: directMessages,
});

// get list of direct conversations for the current user and current workspace
export const fetchDirectMessages = (workspaceId) => async (dispatch) => {
    const response = await fetch(
        `/api/workspaces/${workspaceId}/direct_messages`
    );

    if (response.ok) {
        const { directMessages } = await response.json();
        dispatch(getDirectMessages(directMessages));
        return directMessages;
    }
};

const initialState = {
    currentDirectMessages: [],
    currentIndividualDM: {},
};

const directMessages = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_DIRECT_MESSAGES:
            return {
                ...state,
                currentDirectMessages: [...action.payload],
            };
        case GET_INDIVIDUAL_DM:
            return {
                ...state,
                currentIndividualDM: action.payload,
            };
        case ADD_DIRECT_MESSAGE:
            newState = { ...state };
            newState.currentDirectMessages = [
                ...newState.currentDirectMessages,
                action.payload,
            ];
            return newState;
        case CLEAR_DIRECT_MESSAGES:
            newState = { ...state };
            newState.currentDirectMessages = [];
            newState.currentIndividualDM = {};
            return newState;
        case DELETE_DIRECT_MESSAGE:
            console.log(`action.payload in delete direct message action from store`, action.payload)
            newState = { ...state };

            newState.currentDirectMessages = newState.currentDirectMessages.filter((directMessage) =>
                directMessage.id !== action.payload.deleted_chat.id);
            newState.currentIndividualDM = {};
            return newState;
        case CREATE_INDIVIDUAL_DM_CHAT:
            newState = { ...state };
            newState.currentDirectMessages = [
                ...newState.currentDirectMessages,
                action.payload,
            ];
            return newState;
        default:
            return state;
    }
};

export default directMessages;
