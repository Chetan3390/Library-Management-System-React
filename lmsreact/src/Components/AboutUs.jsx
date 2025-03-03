import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Library Management System. Our mission is to provide an intuitive, efficient, and 
        secure platform for managing library resources. We aim to help users access a world of knowledge 
        with ease and offer robust administration tools for our library staff.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our team is dedicated to continuously improve our system and ensure that our community of readers 
        gets the best possible support and experience. Thank you for choosing us!
      </Typography>
    </Paper>
  );
};

export default AboutUs;
