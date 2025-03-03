import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../../Services/authService';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const authRequest = { username: data.username, password: data.password };
      const tokenResponse = await authService.login(authRequest);
      const token = tokenResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', data.username);

      // Fetch user details to validate admin role
      const userResponse = await authService.getUserDetails(data.username);
      const userObj = userResponse.data;
      if (!userObj || !userObj.id) {
        alert('User details not found.');
        return;
      }
      if (!userObj.roles || userObj.roles.toLowerCase() !== 'admin') {
        alert('User is not authorized as admin');
        return;
      }
      localStorage.setItem('userId', userObj.id);
      localStorage.setItem('userRole', userObj.roles);

      navigate('/admin');
    } catch (error) {
      alert('Admin login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center">
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 15 }}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register('username', { required: 'Username is required' })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Login as Admin
        </Button>
      </form>
    </Paper>
  );
};

export default AdminLogin;
