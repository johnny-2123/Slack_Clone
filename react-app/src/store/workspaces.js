const GET_USER_WORKSPACES = "workspaces/GET_USER_WORKSPACES";
const GET_INDIVIDUAL_WORKSPACE = 'workspaces/GET_INDIVIDUAL_WORKSPACE'
const ADD_WORKSPACE_MEMBER = 'workspaces/ADD_WORKSPACE_MEMBER'

// export const fetchAddWorkspace

const getIndividualWorkspace = workspace => ({
    type: GET_INDIVIDUAL_WORKSPACE,
    payload: workspace
})

export const fetchIndividualWorkspace = (workspaceId) => async dispatch => {
    console.log(`fetching individual workspace********`)

    const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const workspace = await response.json();
        console.log(`data return from individual workspace fetch####################################################:`, workspace)
        dispatch(getIndividualWorkspace(workspace));

        return workspace
    }
}

const getUserWorkspaces = workspaces => ({
    type: GET_USER_WORKSPACES,
    payload: workspaces,
});

export const fetchUserWorkspaces = () => async dispatch => {

    console.log(`fetchUserWorkspaces Before**************************************`)

    const response = await fetch('/api/workspaces/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const workspaces = await response.json();
        console.log(`data return from workspace fetch***************:`, workspaces)
        dispatch(getUserWorkspaces(workspaces.workspaces));

        return workspaces
    }

}


const initialState = {
    userWorkspaces: [],
    currentWorkspace: {}
}

const workspaces = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_WORKSPACES:
            return {
                ...state, userWorkspaces: [...action.payload]
            }
        case GET_INDIVIDUAL_WORKSPACE:
            return {
                ...state, currentWorkspace: action.payload
            }
        default:
            return state
    }
}

export default workspaces
