import defaultAxios from "axios";

const axios = defaultAxios.create({
    baseURL : 'http://localhost:8080',
    crossOrigin : 'http://localhost:8080',
})

export default axios;