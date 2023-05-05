const GET_DIRECT_MESSAGES = "direct_messages/GET_DIRECT_MESSAGES"
const GET_INDIVIDUAL_DM = 'direct_message/GET_INDIViDUAL_DM'

const getIndividualDM = directMessage => ({
    type: GET_INDIVIDUAL_DM,
    payload: directMessage
})

export const fetchIndividualDM = (directMessageId) => async dispatch => {

    const response = await fetch(`/api/direct_messages/${directMessageId}`)

    if (response.ok) {
        const directMessage = await response.json()
        dispatch(getIndividualDM(directMessage))
        return directMessage
    }
}

const getDirectMessages = directMessages => ({
    type: GET_DIRECT_MESSAGES,
    payload: directMessages
})

export const fetchDirectMessages = (workspaceId) => async dispatch => {
    console.log(`fetching Direct Messages`)
    console.log(`workspace id &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`, workspaceId)
    const response = await fetch(`/api/workspaces/${workspaceId}/direct_messages`)

    console.log(`response from fetchDirectMessages in redux store:`, response)

    if (response.ok) {
        const { directMessages } = await response.json()
        console.log(`data returned from direct messages fetch:`, directMessages)
        dispatch(getDirectMessages(directMessages))
        return directMessages
    }
}


const initialState = {
    currentDirectMessages: [],
    currentIndividualDM: {}
}

const directMessages = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_DIRECT_MESSAGES:
            return {
                ...state, currentDirectMessages: [...action.payload]
            }
        case GET_INDIVIDUAL_DM:
            return {
                ...state, currentIndividualDM: action.payload
            }
        default:
            return state
    }
}


export default directMessages;
