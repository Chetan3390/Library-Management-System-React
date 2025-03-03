// src/Components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import authService from '../Services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Create a payload that includes the phone number and address.
      const payload = { ...data, roles: 'USER' };
      const response = await authService.register(payload);
      alert(response.data);
      navigate('/login');
    } catch (error) {
      const errorMsg =
        error.response && typeof error.response.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data || error.message;
      alert('Registration failed: ' + errorMsg);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input 
            type="text" 
            {...register('name', { required: 'Username is required' })} 
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Minimum 6 characters required' }
            })} 
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        {/* Phone Number Input with validation */}
        <div style={{ marginBottom: '10px' }}>
          <label>Phone:</label>
          <input 
            type="text"
            {...register('phone', { 
              required: 'Phone number is required',
              // Regex pattern to allow exactly 10 digits.
              // Adjust this pattern based on your specific needs.
              pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits' }
            })}
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
