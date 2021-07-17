import {v4 as uuid} from 'uuid';
import * as actionType from '../actionTypes';

//SET ALERT
export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuid();

    dispatch({
        type: actionType.SET_ALERT,
        payload: {
            msg,
            alertType,
            id,
        },
    });

    setTimeout(() => dispatch(removeAlert(id)), 3000)
};

//REMOVE ALERT
const removeAlert = (id) => {
    return {
        type: actionType.REMOVE_ALERT,
        payload: id,
    };
};
