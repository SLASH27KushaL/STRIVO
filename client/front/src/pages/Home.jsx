// Home.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppLayout } from '../components/layout/AppLayout';

const Home = () => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: { xs: 2, sm: 4 },
      py: { xs: 4, sm: 8 },
      textAlign: 'center',
      bgcolor: 'background.paper',
      boxShadow: 2,
      borderRadius: 2,
      gap: 2,
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontWeight: 700,
        letterSpacing: '0.1em',
        fontSize: { xs: '2.5rem', sm: '3rem' },
        color: 'primary.main',
      }}
    >
      Strivo
    </Typography>
    <Typography
      variant="subtitle1"
      component="p"
      sx={{
        fontWeight: 400,
        color: 'text.secondary',
        letterSpacing: '0.05em',
        fontSize: { xs: '1rem', sm: '1.25rem' },
      }}
    >
      Select a friend to start chatting
    </Typography>
  </Box>
);

export default AppLayout(Home);
