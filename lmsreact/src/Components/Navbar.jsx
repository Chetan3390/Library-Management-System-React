// src/Components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Library Management System
        </Typography>

        {/* Always visible Home button */}
        <Button color="inherit" component={Link} to="/">Home</Button>

        {token ? (
          <>
            {userRole && userRole.toLowerCase() === 'admin' ? (
              <>
                {/* For admin users, do not show "My Books" */}
                <Button color="inherit" component={Link} to="/admin">
                  Admin Panel
                </Button>
                <Button color="inherit" component={Link} to="/admin/users">
                  User Details
                </Button>
                {/* Optional extra button for navigating back to Admin Panel */}
                <Button color="inherit" onClick={() => navigate('/admin')}>
                  Back to Admin
                </Button>
              </>
            ) : (
              // Non-admin users see "My Books"
              <Button color="inherit" component={Link} to="/books">
                My Books
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              User Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/admin/login">
              Admin Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
