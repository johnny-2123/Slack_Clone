const GET_CHANNELS = "channels/GET_CHANNELS"

const getChannels = channels => ({
    type: GET_CHANNELS,
    payload: channels
})

export const fetchChannels = (workspaceId) => async dispatch => {
    console.log(`fetchChannelsBefore******`)

    const response = await fetch('/api/channels')
}

const initialState = {
    workspaceChannels: [],
    currentChannel: {}
}


const channels = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHANNELS:
            return {
                ...state, workspaceChannels: [...action.payload]
            }
        default:
            return state
    }
}



export default channels
