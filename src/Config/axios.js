import defaultAxios from "axios";

const axios = defaultAxios.create({
    baseURL : 'http://localhost:8080',
    crossOrigin : 'http://localhost:8080',
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
})

export default axios;