const GET_USER_WORKSPACES = "workspaces/GET_USER_WORKSPACES";
const GET_INDIVIDUAL_WORKSPACE = 'workspaces/GET_INDIVIDUAL_WORKSPACE'
const GET_WORKSPACE_MEMBERS = 'workspaces/GET_WORKSPACE_MEMBERS';
const ADD_WORKSPACE_MEMBER = 'workspaces/ADD_WORKSPACE_MEMBER';
const REMOVE_WORKSPACE_MEMBER = 'workspaces/REMOVE_WORKSPACE_MEMBER';
const ADD_WORKSPACE = 'workspaces/CREATE_WORKSPACE';
const UPDATE_WORKSPACE = 'workspaces/UPDATE_WORKSPACE';
const CLEAR_WORKSPACE_STORE = 'workspace/CLEAR_WORKSPACE_STORE'

export const clearWorkspaceStore = () => ({
    type: CLEAR_WORKSPACE_STORE
})

const updateWorkspace = workspace => ({
    type: UPDATE_WORKSPACE,
    payload: workspace
})

export const fetchUpdateWorkspace = (workspace, workspaceId) => async dispatch => {

    console.log(`fetch Updating workspace`)

    const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workspace)
    })

    console.log(`response from fetchUpdateWorkpace:`, response)

    if (response.ok) {
        const updatedWorkspace = await response.json();
        console.log(`updated workspace data from fetchUpdateWorkspace:`, updatedWorkspace);
        dispatch(updateWorkspace(updatedWorkspace));
        return updatedWorkspace
    } else {
        const data = await response.json()
        console.log(`caught errors in fetch update workspace`, data)
        return data
    }

}

const addWorkspace = workspace => ({
    type: ADD_WORKSPACE,
    payload: workspace
})

export const fetchAddWorkspace = (workspace) => async dispatch => {
    // console.log(`workspace received from new Workspace Modal handleSubmit:`, workspace)
    const response = await fetch(`api/workspaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workspace)
    })

    console.log(`response from fetchAddWorkpace:`, response)

    if (response.ok) {
        const newWorkspace = await response.json();
        // console.log(`new workspace data from fetchAddWorkspace:`, newWorkspace);
        dispatch(addWorkspace(newWorkspace));
        return newWorkspace
    } else {
        const data = await response.json()
        // console.log(`caught errors in fetch addWorkspace`, data)
        return data
    }
}

const addWorkspaceMember = member => ({
    type: ADD_WORKSPACE_MEMBER,
    payload: member
})

export const fetchAddWorkspaceMember = (workspaceId, userEmail) => async dispatch => {
    // console.log(`fetch adding workspace member`)

    const response = await fetch(`/api/workspaces/${workspaceId}/members`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_email: userEmail
        })
    })

    if (response.ok) {
        const newMember = await response.json();
        // console.log(`member added`, newMember);
        dispatch(addWorkspaceMember(newMember));
        return newMember;
    } else {
        const data = await response.json()
        console.log(`caught errors in fetch addWorkspace workspace member`, data)
        return data
    }

}


const removeWorkspaceMember = memberId => ({
    type: REMOVE_WORKSPACE_MEMBER,
    payload: memberId
});

export const fetchRemoveWorkspaceMember = (workspaceId, memberId) => async dispatch => {
    // console.log(`fetch removing workspace member`);

    const response = await fetch(`/api/workspaces/${workspaceId}/members`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            member_id: memberId
        })
    });

    if (response.ok) {
        const removedUser = await response.json()
        // console.log(`data returned from fetch remove Workspace member`, removedUser);
        dispatch(removeWorkspaceMember(removedUser.deleted_membership.id));
    }
};

const getWorkspaceMembers = members => ({
    type: GET_WORKSPACE_MEMBERS,
    payload: members
})

export const fetchWorkspaceMembers = (workspaceId) => async dispatch => {
    // console.log(`fetching workspace members`)

    const response = await fetch(`/api/workspaces/${workspaceId}/members`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const workspaceMembers = await response.json();
        // console.log(`data returned from fetchWorkspace members`, workspaceMembers)
        dispatch(getWorkspaceMembers(workspaceMembers.members))
        return workspaceMembers
    }
}

const getIndividualWorkspace = workspace => ({
    type: GET_INDIVIDUAL_WORKSPACE,
    payload: workspace
})

export const fetchIndividualWorkspace = (workspaceId) => async dispatch => {
    // console.log(`fetching individual workspace********`)

    const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const workspace = await response.json();
        // console.log(`data return from individual workspace fetch####################################################:`, workspace)
        dispatch(getIndividualWorkspace(workspace));

        return workspace
    }
}

const getUserWorkspaces = workspaces => ({
    type: GET_USER_WORKSPACES,
    payload: workspaces,
});

export const fetchUserWorkspaces = () => async dispatch => {

    // console.log(`fetchUserWorkspaces Before**************************************`)

    const response = await fetch('/api/workspaces/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        const workspaces = await response.json();
        // console.log(`data return from workspace fetch***************:`, workspaces)
        dispatch(getUserWorkspaces(workspaces.workspaces));

        return workspaces
    } else {
        const data = await response.json()
        console.log(`caught errors in fetch userworkspaces`, data)
        return data
    }

}


const initialState = {
    userWorkspaces: [],
    currentWorkspace: {},
    currentWorkspaceMembers: []
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
        case ADD_WORKSPACE:
            newState = { ...state }
            newState.userWorkspaces = [...newState.userWorkspaces, action.payload]
            return newState
        case UPDATE_WORKSPACE:
            newState = { ...state }
            newState.currentWorkspace = action.payload;
            return newState
        case GET_WORKSPACE_MEMBERS:
            return {
                ...state, currentWorkspaceMembers: [...action.payload]
            }
        case REMOVE_WORKSPACE_MEMBER:
            newState = { ...state };
            newState.currentWorkspaceMembers = newState.currentWorkspaceMembers.filter(
                member => member.id !== action.payload
            );
            return newState;
        case ADD_WORKSPACE_MEMBER:
            newState = { ...state };
            newState.currentWorkspaceMembers = [...newState.currentWorkspaceMembers, action.payload];
            return newState;
        case CLEAR_WORKSPACE_STORE:
            newState = { ...state }
            newState.currentWorkspace = {}
            newState.currentWorkspaceMembers = []
            return newState
        default:
            return state
    }
}

export default workspaces;
