import * as actionType from '../actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null,
};

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case actionType.USER_LOAD_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case actionType.REGISTER_SUCCESS:
        case actionType.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case actionType.REGISTER_FAIL:
        case actionType.LOGIN_FAIL:
        case actionType.AUTH_ERROR:
        case actionType.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
