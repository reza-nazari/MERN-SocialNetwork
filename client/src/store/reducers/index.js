import { combineReducers } from "redux";
import authReducer from './auth';
import alertReducer from './alert';
import profileReducer from "./profile";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer
});

export default rootReducer;
