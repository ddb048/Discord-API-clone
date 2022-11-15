
//*****************************TYPES************************* */

const LOAD_CHANNELS = 'channel/LOAD';
const LOAD_ONE_CHANNEL = 'channel/LOAD_ONE';
const CREATE_CHANNEL = 'channel/ADD';
const REMOVE_CHANNEL = 'channel/REMOVE';
const EDIT_CHANNEL = 'channel/EDIT';

/*******************ACTION CREATORS**************** */
const loadChannels = (channels) => ({
    type: LOAD_CHANNELS,
    channels
})

const loadOneChannel = (channel) => ({
    type: LOAD_ONE_CHANNEL,
    channel
})


const addChannel = (channel) => ({
    type: CREATE_CHANNEL,
    channel
})


const removeChannel = (channelId) => ({
    type: REMOVE_CHANNEL,
    channelId
})


const editChannel = (channel) => ({
    type: EDIT_CHANNEL,
    channel
})

/**********************THUNKS************************* */
//SECTION - (READ)
export const getAllChannel = (serverId) => async dispatch => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const channel = await response.json();
        dispatch(loadChannels(channel.channels))
        return channel.channels
    }
}

//SECTION - (READ)
export const getChannelDetail = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`)

    if (response.ok) {
        const chanDetails = await response.json();
        dispatch(loadOneChannel(chanDetails))
        return chanDetails
    }
}

//SECTION - (CREATE)
//REVIEW - please review backend route to make url more intuitive
export const createChannel = (request) => async dispatch => {
    const { newChannel, serverId } = request
    const response = await fetch(`/api/channels/${serverId}`, {
        method: 'POST',
        body: JSON.stringify(newChannel)
    })

    if (response.ok) {
        const addedChannel = await response.json();
        dispatch(addChannel(addedChannel));
        return addedChannel
    }
}

//SECTION - (UPDATE)
export const updateChannel = (request) => async dispatch => {
    const { update, channelId } = request
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'PUT',
        body: JSON.stringify(update)
    })

    if (response.ok) {
        const updated = await response.json();
        dispatch(editChannel(update));
        return updated
    }
}

//SECTION - (DELETE)
export const deleteChannel = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const delResponse = await response.json()
        dispatch(deleteChannel(channelId))
        return delResponse
    }
}


/******************************REDUCER*************************** */
const initialState = {
    Channels: {},
    OneChannel: {}
}

const channelReducer = (state = initialState, action) => {
    let newState = {}
    let oneChannel;
    switch (action.type) {
        case LOAD_CHANNELS: {
            newState = { ...state, channels: [...action.channels] }
            newState.channels.forEach(channel => {
                newState[channel.id] = channel
            });
            return newState
        };
        case LOAD_ONE_CHANNEL: {
            oneChannel = {};
            newState.channels = { ...state.Channels, [action.channel.id]: action.channel };
            newState.OneChannel = { ...action.channel }

            return newState;
        }
        case CREATE_CHANNEL: {
            newState.channels[action.newChannel.id] = action.channel;
            return newState;
        }
        case EDIT_CHANNEL: {
            newState = { ...state, [action.channel.id]: action.channel };
            return newState
        }
        case REMOVE_CHANNEL: {
            newState = { ...state };
            delete newState[action.serverId];
            return newState
        }
        default:
            return state
    }
}


export default channelReducer
