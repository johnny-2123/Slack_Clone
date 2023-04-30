const GET_CHANNELS = "channels/GET_CHANNELS"
const GET_INDIVIDUAL_CHANNEL = "channels/GET_INDIVIDUAL_CHANNEL"

const getIndividualChannel = channel => ({
    type: GET_INDIVIDUAL_CHANNEL,
    payload: channel
})

export const fetchIndividualChannel = (channelId) => async dispatch => {
    console.log(`fetching individual channel ###############################################################`)

    const response = await fetch(`/api/channels/${channelId}`)

    if (response.ok) {
        const channel = await response.json()
        console.log(`data return from inidivdual channel fetch***************###################################################:`, channel)
        dispatch(getIndividualChannel(channel))
        return channel
    }
}

const getChannels = channels => ({
    type: GET_CHANNELS,
    payload: channels
})

export const fetchChannels = (workspaceId) => async dispatch => {
    console.log(`fetchChannelsBefore******`)

    const response = await fetch('/api/channels/')

    console.log(`response from fetchChannels in redux store***********************************************************************$$$$$$$$$$$$$$$$$$$$$$$$`, response)

    if (response.ok) {
        const channels = await response.json()
        console.log(`data return from channels fetch***************:`, channels)
        dispatch(getChannels(channels))
        return channels
    }

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
        case GET_INDIVIDUAL_CHANNEL:
            return {
                ...state, currentChannel: action.payload
            }
        default:
            return state
    }
}



export default channels
