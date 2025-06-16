// src/shared/ChatItem.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Typography, IconButton, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  isOnline = false,
  newMessage = 0,
  handleDeleteChatOpen,
}) => {
  const theme = useTheme();

  // Helper to render overlapped avatars
  const renderAvatars = () => {
    if (!Array.isArray(avatar) || avatar.length === 0) {
      return <Avatar sx={{ width: 40, height: 40 }} />;
    }
    if (avatar.length === 1) {
      return <Avatar src={avatar[0]} sx={{ width: 40, height: 40 }} />;
    }
    // multiple avatars
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {avatar.slice(0, 3).map((url, i) => (
          <Avatar
            key={i}
            src={url}
            sx={{
              width: 32,
              height: 32,
              border: `2px solid ${theme.palette.background.paper}`,
              ml: i === 0 ? 0 : -1.2, // overlap by shifting left
            }}
          />
        ))}
        {avatar.length > 3 && (
          <Avatar sx={{ width: 32, height: 32, ml: -1.2, fontSize: '0.75rem' }}>
            +{avatar.length - 3}
          </Avatar>
        )}
      </Box>
    );
  };

  return (
    <NavLink to={`/chat/${_id}`} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            mb: 1,
            border: '1px solid',
            borderColor: isActive
              ? theme.palette.primary.main
              : isOnline
              ? theme.palette.success.main
              : theme.palette.grey[300],
            borderRadius: 1,
            bgcolor: isActive
              ? theme.palette.action.selected
              : theme.palette.background.paper,
            transition: 'background-color 0.2s, border-color 0.2s',
            '&:hover': {
              bgcolor: theme.palette.action.hover,
              cursor: 'pointer',
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {renderAvatars()}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: isActive
                    ? theme.palette.primary.main
                    : 'inherit',
                }}
              >
                {name}
              </Typography>
              {isOnline && (
                <Typography variant="caption" sx={{ color: 'success.main' }}>
                  Online
                </Typography>
              )}
              {newMessage > 0 && (
                <Typography variant="caption" sx={{ color: 'error.main', ml: 1 }}>
                  {newMessage} new
                </Typography>
              )}
            </Box>
          </Stack>

          <IconButton
            size="small"
            onClick={(e) => {
              e.preventDefault(); // prevent nav
              handleDeleteChatOpen(_id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </NavLink>
  );
};

export default ChatItem;
