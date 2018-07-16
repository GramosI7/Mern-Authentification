import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post("/users/register", userData)
        .then(response => history.push("/login"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )};


// Login and User Token
export const loginUser = (userData) => dispatch => {
    axios.post("/users/login", userData)
        .then(response => {
            // save in localStorage
            const { token } = response.data;
            // Set token to localStorage
            localStorage.setItem("jwtToken", token);
            // Set token to Auth Header
            setAuthToken(token);
            // decode token pour recuperer l'user
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// logout user 
export const logoutUser = () => dispatch => {
    // Remove Token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future request
    setAuthToken(false);
    // Set current user state to {} and is authenticated to false
    dispatch(setCurrentUser({}))
}