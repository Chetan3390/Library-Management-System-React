import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        backgroundColor: '#eee',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Library Management System. All Rights Reserved.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button variant="text" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button variant="text" onClick={() => navigate('/about')}>
          About Us
        </Button>
        <Button variant="text" onClick={() => navigate('/contact')}>
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
