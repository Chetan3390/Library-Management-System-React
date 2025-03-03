import React from 'react';
import { Paper, Typography, Link, Box } from '@mui/material';

const Contact = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can reach us via the following methods:
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          <strong>Email:</strong>{' '}
          <Link href="mailto:admin@cognizant.com" underline="hover">
            admin@cognizant.com
          </Link>
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> (+91) 999-888-8888
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> Cognizant H04, HiTech City, Hyderabad, Telangana, India
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Hours of Operation: Monday - Friday, 9:00 AM - 5:00 PM.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Contact;
