// src/Components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography } from '@mui/material';
import authService from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const authRequest = { username: data.username, password: data.password };
      const tokenResponse = await authService.login(authRequest);
      const token = tokenResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', data.username);
      
      // Fetch user details using the endpoint in authService
      const userResponse = await authService.getUserDetails(data.username);
      const userObj = userResponse.data;
      if (userObj && userObj.id) {
        localStorage.setItem('userId', userObj.id);
      } else {
        alert('User details not found.');
        return;
      }
      
      localStorage.setItem('userRole', userObj.roles || 'USER');
      navigate('/books');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h5" align="center">User Login</Typography>
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
        <Button variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }}>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
