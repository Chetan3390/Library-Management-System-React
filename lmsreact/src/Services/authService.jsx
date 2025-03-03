import axios from 'axios';
import api from './api';

const BASE_URL = 'http://localhost:9091/auth';

const authService = {
  // Returns a JWT token
  login: (authRequest) => axios.post(`${BASE_URL}/authenticate`, authRequest),
  // Registers a new user
  register: (userInfo) => axios.post(`${BASE_URL}/new`, userInfo),
  // Returns roles (if needed)
  getRoles: (username) => axios.get(`${BASE_URL}/getroles/${username}`),
  // Fetches user details (including userId) using the username; adjust the URL as needed!
  getUserDetails: (username) => axios.get(`${BASE_URL}/user/${username}`),
};

export default authService;
