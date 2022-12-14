/********************TYPES******************* */

const LOAD_MESSAGES = 'messages/LOAD';
// const LOAD_ONE_MESSAGE = 'messages/LOAD_ONE';
const CREATE_MESSAGE = 'messages/ADD';
const REMOVE_MESSAGE = 'messages/REMOVE';
const EDIT_MESSAGE = 'messages/EDIT';

/*******************ACTION CREATORS*********** */
const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

const addMessage = (newMessage) => ({
    type: CREATE_MESSAGE,
    newMessage
})

const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId
})

const editMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
})

/*********************THUNKS********************** */

//SECTION - (READ)
export const getAllMessages = (channelId) => async dispatch => {
    const response = await fetch(`/api/messages/${channelId}`)

    if (response.ok) {
        const allMessages = await response.json()
        dispatch(loadMessages(allMessages))
        return allMessages
    }
}

//SECTION - (CREATE)
export const createMessage = (payload) => async dispatch => {
    const { serverId, channelId, message_body } = payload
    console.log('this is the payload in the thunk', message_body)
    const response = await fetch(`/api/messages/${serverId}/${channelId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_body })
    })

    if (response.ok) {
        const addedMessage = await response.json()
        dispatch(addMessage(addedMessage))
        return addedMessage
    }
}

//REVIEW - backend route could be made simpler
//SECTION - (UPDATE)
export const updateMessage = (payload) => async dispatch => {
    const { serverId, channelId, messageId, message } = payload
    const response = await fetch(`/api/messages/${serverId}/${channelId}/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    })

    if (response.ok) {
        const updatedMessage = await response.json()
        dispatch(editMessage(updatedMessage))
        return updatedMessage
    }
}

//SECTION - (DELETE)
export const deleteMessage = (messageId) => async dispatch => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const deleteMess = await response.json()
        dispatch(removeMessage(messageId))
        return deleteMess
    }
}


/************************REDUCER************************** */
const initialState = { messages: {} }
const messageReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_MESSAGES:
            newState = { ...state, messages: {} }

            action.messages.forEach(message => {
                newState.messages[message.id] = message
            });
            return newState

        //REVIEW - ANCHOR - FOR CINDY: CREATE_MESSAGE DID NOT HAVE A RETURN> UPDATED TO FIX RENDER
        case CREATE_MESSAGE:
            newState = { ...state, [action.newMessage.id]: action.newMessage };
            console.log("action", action);
            return newState

        case EDIT_MESSAGE:
            newState = { ...state, [action.message.id]: action.message };
            return newState

        case REMOVE_MESSAGE:
            newState = { ...state };
            delete newState[action.messageId]
            return newState

        default:
            return state
    }
}

export default messageReducer
