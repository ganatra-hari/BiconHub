import axios from 'axios';

// Create a custom Axios instance that automatically uses your backend URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // This is helpful since we enabled it in your backend CORS!
});

export default api;