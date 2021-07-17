import * as actionType from '../actionTypes';
import { setAlert } from './index';
import setAuthToken from '../../config/setAuthToken';
import sn_v1_account_repo from '../../repository/v1/account_repo';

//INIT REGISTER
export const initRegister = (payload) => async (dispatch) => {
    const { name, email, password } = payload;
    const register_model = { name, email, password };

    try {
        const res = await sn_v1_account_repo.register(register_model)

        dispatch(registerSuccess(res.data));

        dispatch(initUserLoad());
    } catch (response) {
        const errors = response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch(registerFail());
    }
};

function registerSuccess(payload) {
    return {
        type: actionType.REGISTER_SUCCESS,
        payload: payload,
    };
};

function registerFail() {
    return {
        type: actionType.REGISTER_FAIL,
    };
};

export const initLogin = (payload) => async (dispatch) => {
    const { email, password } = payload;
    const login_model = ({ email, password });

    try {
        const response = await sn_v1_account_repo.login(login_model)

        dispatch(loginSuccess(response.data));
        dispatch(initUserLoad());
    } catch (err) {
        const errors = err.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch(loginFail());
    }
};

function loginSuccess(payload) {
    return {
        type: actionType.LOGIN_SUCCESS,
        payload: payload,
    };
};

function loginFail() {
    return {
        type: actionType.LOGIN_FAIL,
    };
};

export const initUserLoad = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const response = await sn_v1_account_repo.getUser();

        if (response)
            dispatch(loadUserSuccess(response));

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

export const logout = () => dispatch => {
    dispatch({
        type: actionType.CLEAR_PROFILE
    });

    dispatch({
        type: actionType.LOGOUT,
    });  
};
