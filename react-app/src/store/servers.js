// NOTE do we need csrf on the fronend side?

/********************TYPES******************* */

const LOAD_SERVERS = 'servers/LOAD';
const LOAD_ONE_SERVER = 'servers/LOAD_ONE';
const CREATE_SERVER = 'servers/ADD';
const REMOVE_SERVER = 'servers/REMOVE';
const EDIT_SERVER = 'servers/EDIT';


/*******************ACTION CREATORS*********** */

const loadServers = (servers) => ({
    type: LOAD_SERVERS,
    servers
})

const loadOneServer = (server) => ({
    type: LOAD_ONE_SERVER,
    server
})

const addServer = (newServer) => ({
    type: CREATE_SERVER,
    newServer
})

const removeServer = (serverId) => ({
    type: REMOVE_SERVER,
    serverId
})

const editServer = (server) => ({
    type: EDIT_SERVER,
    server
})

/*********************THUNKS********************** */

//SECTION - GET /api/servers (READ)
export const getAllServers = () => async dispatch => {
    const response = await fetch('/api/servers')

    if (response.ok) {
        const servers = await response.json();
        dispatch(loadServers(servers.Servers));
        return servers.Servers
    }

}

//SECTION - GET /api/servers/@me (READ)
export const getAllCurrentUserServers = () => async dispatch => {
    const response = await fetch('/api/servers/@me')

    if (response.ok) {
        const servers = await response.json();
        dispatch(loadServers(servers.Servers));
        return servers.Servers
    }

}

//SECTION - GET /api/servers/:serverId (READ)
export const getServerDetails = serverId => async dispatch => {
    const response = await fetch(`/api/servers/${serverId}`);

    if (response.ok) {
        const server = await response.json();
        dispatch(loadOneServer(server))
    }
}

//SECTION - POST /api/servers/@me (CREATE)
export const createServer = newServer => async dispatch => {
    const response = await fetch('/api/servers/@me', {
        method: 'POST',
        body: JSON.stringify(newServer)
    });

    if (response.ok) {
        const newServer = await response.json();
        dispatch(addServer(newServer));
        return newServer;
    }
}

//SECTION - PUT /api/servers/@me/:serverId (UPDATE)
export const updateServer = server => async dispatch => {
    const response = await fetch(`/api/servers/@me/${server.id}`, {
        method: 'PUT',
        body: JSON.stringify(server)
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(editServer(server));
        return server;
    }
}

//!SECTION - DELETE /api/servers/@me/:serverId (DELETE)
export const deleteServer = server => async dispatch => {
    const response = await fetch(`/api/servers/@me/${server.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(removeServer(server));
        return server;
    }
}
/************************REDUCER************************** */

const initialState = {
    Servers: {},
    OneServer: {}

}

serverReducer = (state = initialState, action) => {
    let newState = {}
    let oneServer;

    switch (action.type) {
        case LOAD_SERVERS: {
            newState = { ...state, servers: [...action.servers] }
            newState.servers.forEach(server => {
                newState[server.id] = server
            });
            return newState
        };

        case LOAD_ONE_SERVER: {
            oneServer = {};
            newState.servers = { ...state.Servers, [action.server.id]: action.server };
            newState.oneServer = { ...action.server };

            return newState
        }
        case CREATE_SERVER: {
            newState.servers[action.newServer.id] = action.newServer;

            return newState;

        };
        case EDIT_SERVER: {
            newState = { ...state, [action.server.id]: action.server };
            return newState
        };
        case REMOVE_SERVER: {
            newState = { ...state };
            delete newState[action.serverId];
            return newState;
        };
        default:
            return state
    }
};

export default serverReducer
