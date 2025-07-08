// ChatItem.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Box, 
  Stack, 
  Typography, 
  IconButton, 
  Avatar, 
  Badge, 
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinIcon from '@mui/icons-material/PushPin';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArchiveIcon from '@mui/icons-material/Archive';
import CircleIcon from '@mui/icons-material/Circle';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  isOnline = false,
  newMessage = 0,
  lastMessage = '',
  lastMessageTime = '',
  isPinned = false,
  isMuted = false,
  isTyping = false,
  handleDeleteChatOpen,
  handlePinChat,
  handleMuteChat,
  handleArchiveChat,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Enhanced avatar with better styling
  const avatarNode = Array.isArray(avatar) && avatar.length > 0 ? (
    avatar.length === 1 ? (
      <Avatar 
        src={avatar[0]} 
        sx={{ 
          width: 52, 
          height: 52,
          border: '3px solid',
          borderColor: 'background.paper',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }} 
      />
    ) : (
      <AvatarGroup
        max={3}
        sx={{ 
          '& .MuiAvatar-root': { 
            border: theme => `3px solid ${theme.palette.background.paper}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          } 
        }}
      >
        {avatar.map((url, i) => (
          <Avatar key={i} src={url} />
        ))}
      </AvatarGroup>
    )
  ) : (
    <Avatar 
      sx={{ 
        width: 52, 
        height: 52,
        bgcolor: 'primary.main',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        border: '3px solid',
        borderColor: 'background.paper',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {initials}
    </Avatar>
  );

  // Enhanced online indicator with pulsing animation
  const onlineIndicator = isOnline && (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        bgcolor: 'success.main',
        border: '3px solid',
        borderColor: 'background.paper',
        borderRadius: '50%',
        boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.3)',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -6,
          left: -6,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'success.main',
          opacity: 0.3,
          animation: 'pulse 2s infinite ease-in-out',
        },
        '@keyframes pulse': {
          '0%': { transform: 'scale(0.8)', opacity: 0.8 },
          '50%': { transform: 'scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'scale(0.8)', opacity: 0.8 },
        },
      }}
    />
  );

  const handleMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    handleMenuClose();
    switch (action) {
      case 'delete':
        handleDeleteChatOpen?.(_id);
        break;
      case 'pin':
        handlePinChat?.(_id);
        break;
      case 'mute':
        handleMuteChat?.(_id);
        break;
      case 'archive':
        handleArchiveChat?.(_id);
        break;
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const date = new Date(time);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  return (
    <NavLink to={`/chat/${_id}`} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              p: 2,
              mb: 1,
              bgcolor: isActive 
                ? 'primary.main' 
                : isHovered 
                  ? 'action.hover' 
                  : 'background.paper',
              color: isActive ? 'primary.contrastText' : 'text.primary',
              border: 1,
              borderColor: isActive ? 'primary.main' : 'divider',
              borderRadius: 3,
              boxShadow: isActive 
                ? '0 8px 25px rgba(0,0,0,0.15)' 
                : isHovered 
                  ? '0 4px 12px rgba(0,0,0,0.1)' 
                  : '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              overflow: 'hidden',
              '&::before': isPinned ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: 'warning.main',
              } : {},
            }}
          >
            {/* Avatar Section */}
            <Box sx={{ position: 'relative', mr: 2 }}>
              {avatarNode}
              {onlineIndicator}
            </Box>

            {/* Content Section */}
            <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  noWrap
                  sx={{
                    fontWeight: 600,
                    color: isActive ? 'inherit' : 'text.primary',
                    mr: 1,
                  }}
                >
                  {name}
                </Typography>
                
                {/* Status indicators */}
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  {isPinned && (
                    <Tooltip title="Pinned">
                      <PushPinIcon 
                        sx={{ 
                          fontSize: 14, 
                          color: isActive ? 'inherit' : 'warning.main',
                          opacity: 0.8 
                        }} 
                      />
                    </Tooltip>
                  )}
                  {isMuted && (
                    <Tooltip title="Muted">
                      <VolumeOffIcon 
                        sx={{ 
                          fontSize: 14, 
                          color: isActive ? 'inherit' : 'text.secondary',
                          opacity: 0.8 
                        }} 
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>

              {/* Last message or typing indicator */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flexGrow: 1 }}>
                  {isTyping ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: isActive ? 'inherit' : 'primary.main',
                            fontStyle: 'italic',
                            fontWeight: 500
                          }}
                        >
                          typing...
                        </Typography>
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <CircleIcon sx={{ fontSize: 6, color: 'primary.main' }} />
                      </motion.div>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        color: isActive ? 'inherit' : 'text.secondary',
                        opacity: 0.8,
                        maxWidth: '200px'
                      }}
                    >
                      {lastMessage}
                    </Typography>
                  )}
                </Box>

                {/* Time and message count */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                  {lastMessageTime && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: isActive ? 'inherit' : 'text.secondary',
                        opacity: 0.7,
                        fontSize: '0.75rem'
                      }}
                    >
                      {formatTime(lastMessageTime)}
                    </Typography>
                  )}
                  
                  <AnimatePresence>
                    {newMessage > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Chip
                          label={newMessage > 99 ? '99+' : newMessage}
                          size="small"
                          sx={{
                            bgcolor: 'error.main',
                            color: 'error.contrastText',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            height: 20,
                            minWidth: 20,
                            '& .MuiChip-label': {
                              px: 0.5,
                            },
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
            </Stack>

            {/* Menu Button */}
            <AnimatePresence>
              {(isHovered || menuOpen) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconButton
                    size="small"
                    onClick={handleMenuClick}
                    sx={{ 
                      color: isActive ? 'inherit' : 'text.secondary',
                      ml: 1,
                      '&:hover': {
                        bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'action.hover'
                      }
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Context Menu */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                border: '1px solid',
                borderColor: 'divider',
              }
            }}
          >
            <MenuItem onClick={() => handleMenuAction('pin')}>
              <ListItemIcon>
                <PushPinIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={isPinned ? 'Unpin' : 'Pin'} />
            </MenuItem>
            
            <MenuItem onClick={() => handleMenuAction('mute')}>
              <ListItemIcon>
                <VolumeOffIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={isMuted ? 'Unmute' : 'Mute'} />
            </MenuItem>
            
            <MenuItem onClick={() => handleMenuAction('archive')}>
              <ListItemIcon>
                <ArchiveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Archive" />
            </MenuItem>
            
            <MenuItem 
              onClick={() => handleMenuAction('delete')}
              sx={{ color: 'error.main' }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
          </Menu>
        </motion.div>
      )}
    </NavLink>
  );
};

export default ChatItem;