import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// Creation de l'export des reducers N°3

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});