const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('signin success', action.user);
            return {
                ...state,
                authError: null
            };
        case 'LOGIN_ERROR':
            console.log('Login Failed error', action.error);
            return {
                ...state,
                authError: action.error.message
            };
        case 'LOGOUT_SUCCESS':
            console.log('logout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('signup Failed error', action.error);
            return {
                ...state,
                authError: action.error.message
            };
        default:
            return state;
    }
}

export default authReducer;