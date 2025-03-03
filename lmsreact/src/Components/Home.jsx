import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        minHeight: 'calc(100vh - 140px)', 
        backgroundImage: 'url(/Library.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)', // Optional overlay for contrast
          p: 2
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            textAlign: 'center'
          }}
        >
          Welcome to the Library Management System
        </Typography>
      </Box>
    </Paper>
  );
};

export default Home;
