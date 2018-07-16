import axios from "axios";

const setAuthToken = token => {
    if(token) {
        // Appliquer a toute les requetes
        axios.defaults.headers.common["Authorization"] = token
    } else {
        // Supprimer Auth Header
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;