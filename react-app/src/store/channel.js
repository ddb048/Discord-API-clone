
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
        // console.log('channels in thunk',channel.channels)
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
export const createChannel = (serverId, newChannel) => async dispatch => {
    console.log('this newchannel in channel thunnk', newChannel)
    const response = await fetch(`/api/channels/${serverId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChannel)
    })
    console.log('this is the response', response)
    if (response.ok) {
        const addedChannel = await response.json();
        dispatch(addChannel(addedChannel));
        return addedChannel
    }
}

//SECTION - (UPDATE)
export const updateChannel = (channelId, update) => async dispatch => {

    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
    })

    if (response.ok) {
        const updated = await response.json();
        dispatch(editChannel(updated));
        return updated
    }
}

//SECTION - (DELETE)
export const deleteChannel = (channelId) => async dispatch => {
    console.log('channel id in the delete channel thunk', channelId)
    const response = await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const delResponse = await response.json()
        dispatch(removeChannel(channelId))
        return delResponse
    }
}

// const normalizeArr = () => {

// }
/******************************REDUCER*************************** */
const initialState = {
    channels: {},
    OneChannel: {}
}

const channelReducer = (state = initialState, action) => {
    let newState = {}
    let channels = {};
    switch (action.type) {
        case LOAD_CHANNELS:
            newState = { ...state }
            action.channels.forEach(channel => {
                // console.log('id in channel reducer', channel.id === 1)
                channels[channel.id] = channel
            });
            newState.channels = channels
            return newState

        case LOAD_ONE_CHANNEL:
            newState.channels = { ...state.channels, [action.channel.id]: action.channel };
            // console.log('ACTION', action.channel)
            // console.log('NEW STATE', newState)
            newState.OneChannel = { ...action.channel }

            return newState;

        case CREATE_CHANNEL:
            newState.channels = { ...state.channels, [action.channel.id]: action.channel };

            // console.log('new state in create channel', action)
            return newState;

        case EDIT_CHANNEL:
            newState = { ...state, [action.channel.id]: action.channel };
            return newState

        case REMOVE_CHANNEL:
            newState = { ...state };
            delete newState[action.channelId];
            return newState

        default:
            return state
    }
}


export default channelReducer
