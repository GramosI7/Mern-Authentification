import { createStore, applyMiddleware, compose } from 'redux';
// import du middleware
import thunk from "redux-thunk";
// import des Reducers
import rootReducer from "./reducers";

const initialState = {};

// Ajout de thunk dans les parametres de applyMiddleware N°2
const middleware = [thunk];

// Creation du Store N°1
const store = createStore(
    rootReducer, 
    initialState, 
    compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) );

export default store;