import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button
} from '@mui/material';
import adminService from '../../Services/adminServices';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      const errorMsg =
        error.response && typeof error.response.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data || error.message;
      alert("Error fetching users: " + errorMsg);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.roles && user.roles.toLowerCase().includes(searchQuery.toLowerCase())) ||
    user.id.toString().includes(searchQuery)
  );

  return (
    <Paper elevation={3} sx={{ padding: 3, my: 2 }}>
      <Typography variant="h4" gutterBottom>User Details</Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Roles</TableCell>
              <TableCell align="center">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.roles}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={loadUsers} sx={{ mt: 2 }}>
        Refresh Users
      </Button>
    </Paper>
  );
};

export default AdminUsers;
