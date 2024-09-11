import axios from "axios";

//console.log('sdfbgf', process.env.REACT_APP_API_URL);
export const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
})
