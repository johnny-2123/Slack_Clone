const GET_CHANNELS = "channels/GET_CHANNELS"
const GET_INDIVIDUAL_CHANNEL = "channels/GET_INDIVIDUAL_CHANNEL"
const GET_CHANNEL_MESSAGES = "channels/GET_CHANNEL_MESSAGES"

const getChannelMessages = messages => ({
    type: GET_CHANNEL_MESSAGES,
    payload: messages
})

export const fetchChannelMessages = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}/messages`)

    if (response.ok) {
        const messages = await response.json()
        dispatch(getChannelMessages(messages))
        return messages
    }
}

const getIndividualChannel = channel => ({
    type: GET_INDIVIDUAL_CHANNEL,
    payload: channel
})

export const fetchIndividualChannel = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`)

    if (response.ok) {
        const channel = await response.json()
        dispatch(getIndividualChannel(channel))
        return channel
    }
}

const getChannels = channels => ({
    type: GET_CHANNELS,
    payload: channels
})

export const fetchChannels = (workspaceId) => async dispatch => {

    const response = await fetch('/api/channels/')

    if (response.ok) {
        const channels = await response.json()
        dispatch(getChannels(channels))
        return channels
    }

}

const initialState = {
    workspaceChannels: [],
    currentChannel: {},
    currentChannelMessages: []
}

const channels = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHANNELS:
            return {
                ...state, workspaceChannels: [...action.payload]
            }
        case GET_INDIVIDUAL_CHANNEL:
            return {
                ...state, currentChannel: action.payload
            }
        case GET_CHANNEL_MESSAGES:
            return {
                ...state, currentChannelMessages: action.payload
            }
        default:
            return state
    }
}



export default channels
