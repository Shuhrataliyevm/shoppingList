import axios from "axios";


const API = axios.create({
    baseURL: "https://nt-shopping-list.onrender.com/api"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers['x-auth-token'] =`${token}`;
    }
    return req;
});

API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            setTimeout(() => {
                window.location.replace("/login"); 
            }, 500);
        }
        return Promise.reject(err);
    }
);

export default API;
