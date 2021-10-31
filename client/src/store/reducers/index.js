import { combineReducers } from "redux";
import authReducer from './auth';
import alertReducer from './alert';
import profileReducer from "./profile";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    loading: loadingReducer
});

export default rootReducer;
