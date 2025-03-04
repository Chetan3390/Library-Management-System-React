import axios from 'axios'; // This file creates a centralized Axios instance.
// It attaches the authorization header from localStorage to each request.

const api = axios.create();

// Attach the JWT token on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
