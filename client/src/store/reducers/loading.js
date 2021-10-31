import { LOADING_ON, LOADING_OFF } from "../actionTypes";

const initialState = {
    isLoading: false
}

const loadingReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOADING_ON:
            return {
                ...state,
                isLoading: true
            }
        case LOADING_OFF:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
};

export default loadingReducer;