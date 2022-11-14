// NOTE do we need csrf on the fronend side?

const LOAD_SERVERS = 'servers/loadServers';
const CREATE_SERVER = 'servers/createServer';
const DELETE_SERVER = 'servers/deleteServer';
const EDIT_SERVER = 'servers/editServer';

export const loadServers = ( servers ) => {
    return {
        type: LOAD_SERVERS,
        servers
    };
};

export const createServer = ( server ) => {
    return {
        type: CREATE_SERVER,
        server
    };
};

export const deleteServer = ( server ) => {
   return { 
    type: DELETE_SERVER,
    server
   };
};

export const editServer = (server) => {
  return { 
    type: DELETE_SERVER, 
    server };
};

//get all servers thunk

export const getAllServersThunk = () => async(dispatch) => {
 const response = await fetch('api/servers')
 const data = await response.json();

 dispatch(loadServers(data.servers))
}




serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SERVERS: {
            const newState = {...state,servers:[...action.servers]}
            newState.servers.forEach(server => {
                newState[server.id] = server
            });
            return newState
        };
        case CREATE_SERVER: {
            // NOTE need to finish servers reducer according to the redux store structure

        };
        case EDIT_SERVER:{

        };
        case DELETE_SERVER: {

        };
        default:
            return state
    }
};

export default serverReducer