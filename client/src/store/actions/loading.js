import { LOADING_OFF, LOADING_ON } from "../actionTypes";

export const loading_on = () => dispatch => {
    dispatch({
        type: LOADING_ON
    })
}

export const loading_off = () => dispatch => {
    dispatch({
        type: LOADING_OFF
    })
};

