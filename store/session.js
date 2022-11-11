
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
