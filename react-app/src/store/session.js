
/****************TYPES*************** */

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

/****************ACTIONS************* */

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

/***************THUNKS**************** */

export const authenticate = () => async (dispatch) => {
    //REVISE URL AS NECESSARY
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if (data.errors) { }
    }
}


export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

/**********************REDUCER********************************** */
let initialState = {}
export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
}
