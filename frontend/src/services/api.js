import axios from "axios";

const API = axios.create({
    baseURL: "http://13.212.167.226:5000"
});

export default API;