import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppLayout } from '../components/layout/AppLayout';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        textAlign: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: '0.05em',
          fontSize: '3rem',  // increased size
          mb: 1,
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
          letterSpacing: '0.02em',
          fontSize: '1.25rem',  // increased size
        }}
      >
        Select a friend to start chatting
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
