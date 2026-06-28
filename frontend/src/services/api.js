import axios from "axios";

const API = axios.create({
    baseURL: "http://47.129.210.90:5000"
});

export default API;