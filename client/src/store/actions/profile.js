import { GET_PROFILE, PROFILE_ERROR } from '../actionTypes'
import sn_v1_profile_repo from '../../repository/v1/profile_repo'

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const response = await sn_v1_profile_repo.get();

        dispatch(get_profile(response));

    } catch (error) {
        profile_error(error);
    }
}

function get_profile(payload) {
    return {
        type: GET_PROFILE,
        payload: payload
    }
};

function profile_error(error) {
    return {
        type: PROFILE_ERROR,
        payload: { msg: error }
    }
};

export const createProfile = (form, history, edit = false ) => async(dispatch) => {
    try {
        const response = await sn_v1_profile_repo.post(form);
    } catch (error) {
        
    }
}