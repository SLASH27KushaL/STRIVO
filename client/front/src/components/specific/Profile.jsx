import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'; // Added Navigate import
import { Avatar, Stack, Typography, Box, Paper, Button } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to /login if not authenticated
  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
        }}
      >
        Loading…
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleEditProfile = () => {
    // Placeholder: Navigate to an edit profile page or open a modal
    console.log('Edit Profile clicked');
    navigate('/edit-profile'); // Adjust to your edit profile route
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 10,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
          borderRadius: 3,
          pt: 7,
          pb: 4,
          textAlign: 'center',
        }}
      >
        <Avatar
          src={user.avatar?.url || ''} // Use avatar.url from User schema
          alt={user.name}
          sx={{
            width: 96,
            height: 96,
            position: 'absolute',
            top: -48,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '3px solid white',
            boxSizing: 'content-box',
          }}
        />

        <Stack spacing={1.5} mt={2.5} alignItems="center" px={2}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
            {user.bio || 'No bio available'}
          </Typography>
          <Button
            variant="contained"
            size="medium"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              px: 3,
              py: 1,
              mt: 2,
              minWidth: 130,
              backgroundColor: '#2a2a3d', // Dark theme button
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#3a3a4d', // Slightly lighter on hover
              },
            }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;