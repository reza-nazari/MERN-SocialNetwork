import * as actionType from './actionTypes';
import {setAlert} from './index';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

//INIT REGISTER
export const initRegister = (payload) => async (dispatch) => {
    const {name, email, password} = payload;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('api/users', body, config);

        dispatch(registerSuccess(res.data));

        dispatch(initUserLoad());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch(registerFail());
    }
};

//REGISTER SUCCESS
const registerSuccess = (paylaod) => {
    return {
        type: actionType.REGISTER_SUCCESS,
        payload: paylaod,
    };
};

//REGISTER FAIL
const registerFail = (er) => async (dispatch) => {
    return {
        type: actionType.REGISTER_FAIL,
    };
};

//INIT LOGIN
export const initLogin = (payload) => async (dispatch) => {
    const {email, password} = payload;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('api/auth', body, config);

        dispatch(loginSuccess(res.data));

        dispatch(initUserLoad());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch(loginFail());
    }
};

//LOGIN SUCCESS
const loginSuccess = (paylaod) => {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: paylaod,
    };
};

//LOGIN FAIL
const loginFail = (er) => async (dispatch) => {
    return {
        type: actionType.LOGIN_FAIL,
    };
};

//LOAD USER
export const initUserLoad = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch(loadUserSuccess(res.data));
    } catch (error) {
        dispatch(authError());
    }
};

export const loadUserSuccess = (payload) => {
    return {
        type: actionType.USER_LOAD_SUCCESS,
        payload: payload,
    };
};
export const authError = () => {
    return {
        type: actionType.AUTH_ERROR,
    };
};

export const logout = () => {
    return {
        type: actionType.LOGOUT,
    };
};
