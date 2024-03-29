import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from '../actionTypes'

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    error: {}
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer;