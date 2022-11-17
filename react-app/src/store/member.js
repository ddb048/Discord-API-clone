/********************TYPES******************* */


const LOAD_MEMBERS = 'members/LOAD';
// const LOAD_ONE_MEMBER = 'members/LOAD_ONE';
const CREATE_MEMBER = 'members/ADD';
const REMOVE_MEMBER = 'members/REMOVE';
const EDIT_MEMBER = 'members/EDIT';


/*******************ACTION CREATORS*********** */

const loadMembers = (members) => ({
    type: LOAD_MEMBERS,
    members
})

// const loadOneMember = (member) => ({
//     type: LOAD_ONE_MEMBER,
//     member
// })

const addMember = (newMember) => ({
    type: CREATE_MEMBER,
    newMember
})

const removeMember = (memberId) => ({
    type: REMOVE_MEMBER,
    memberId
})

const editRole = (member) => ({
    type: EDIT_MEMBER,
    member
})

/*****************************THUNK**************************** */
export const getAllMembers = (serverId) => async dispatch => {

    const response = await fetch(`/api/servers/${serverId}/members`)

    if (response.ok) {
        const allMembers = await response.json()
        dispatch(loadMembers(allMembers))

        return allMembers
    }
}

//REVIEW - Does a post work without a body
export const createMember = (payload) => async dispatch => {
    const { serverId, userId } = payload
    const response = await fetch(`/api/servers/${serverId}/members/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newMember = await response.json()
        dispatch(addMember(newMember))
        return newMember
    }
}

export const updateRoles = (payload) => async dispatch => {
    const { serverId, userId } = payload
    const response = await fetch(`/api/servers/${serverId}/members/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
    })

    if (response.ok) {
        const updatedMember = await response.json()
        dispatch(editRole(updatedMember))
        return updatedMember
    }

}

export const deleteMember = (payload) => async dispatch => {
    const { serverId, userId } = payload
    const response = await fetch(`/api/servers/${serverId}/members/${userId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deleteMessage = await response.json()
        dispatch(removeMember(userId))
        return deleteMessage
    }
}

/************************REDUCER************************** */

const initialState = {
    members: {}
}


const memberReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_MEMBERS: {
            newState = { ...state, members: {} }
            action.members.forEach(member => {
                newState.members[member.id] = member
            });
            return newState
        }
        case CREATE_MEMBER: {
            newState.members[action.newMember.id] = action.newMember
            return newState
        }
        case EDIT_MEMBER: {
            newState = { ...state, [action.member.id]: action.member }
            return newState
        }
        case REMOVE_MEMBER: {
            newState = { ...state };
            delete newState[action.memberId];
            return newState
        }
        default:
            return state
    }
}

export default memberReducer
