import React from 'react';
import { Avatar, Stack, Typography, Box, Paper, Button } from '@mui/material';

const Profile = () => {
  const user = {
    name: 'Kushal Kishore',
    username: '@kushalk',
    bio: 'Passionate developer. Music lover. Always learning something new.',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
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
          src={user.avatar}
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
            {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
            {user.bio}
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
  onClick={() => console.log('Edit Profile clicked')}
>
  Edit Profile
</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
