import axios from "axios";

const instance = axios.create({
    // baseURL: "http://127.0.0.1:8000",
    baseURL: "http://192.168.1.82:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
