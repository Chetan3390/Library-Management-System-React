import api from './api';

const ADMIN_BASE_URL = 'http://localhost:9091/auth'; // Adjust the port/path as needed

const adminService = {
  // This method fetches all user details from the backend.
  getAllUsers: () => api.get(`${ADMIN_BASE_URL}/users`)
};

export default adminService;
