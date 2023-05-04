const GET_DIRECT_MESSAGES = "direct_messages/GET_DIRECT_MESSAGES"

const getDirectMessages = directMessages => ({
    type: GET_DIRECT_MESSAGES,
    payload: directMessages
})

export const fetchDirectMessages = (workspaceId) => async dispatch => {
    console.log(`fetching Direct Messages`)

    // const response = await fetch

}
