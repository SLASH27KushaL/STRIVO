import React, { useState, useMemo } from 'react';
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
  Fade,
  AvatarGroup,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  PushPin as PushPinIcon,
  VolumeOff as VolumeOffIcon,
  Archive as ArchiveIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuid } from 'uuid';

const formatTime = (isoTime) => {
  if (!isoTime) return '';
  const date = new Date(isoTime);
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(diff / 86400000);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
};

const ChatItem = ({
  avatar = [],
  name,
  _id,
  isOnline = false,
  newMessage = 0,
  lastMessage = '',
  lastMessageTime,
  isPinned = false,
  isMuted = false,
  isTyping = false,
  handleDeleteChatOpen,
  handlePinChat,
  handleMuteChat,
  handleArchiveChat,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const initials = useMemo(
    () =>
      name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [name]
  );

  const avatarNode = useMemo(() => {
    const common = {
      width: 48,
      height: 48,
      border: 2,
      borderColor: 'background.paper',
      boxShadow: 1,
    };
    if (avatar.length === 1) {
      return <Avatar src={avatar[0]} sx={common} />;
    }
    if (avatar.length > 1) {
      return (
        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': common }}>
          {avatar.map((url) => (
            <Avatar key={uuid()} src={url} />
          ))}
        </AvatarGroup>
      );
    }
    return <Avatar sx={{ ...common, bgcolor: 'primary.main' }}>{initials}</Avatar>;
  }, [avatar, initials]);

  const onlineIndicator = isOnline && (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        bgcolor: 'success.main',
        border: 2,
        borderColor: 'background.paper',
        borderRadius: '50%',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -6,
          left: -6,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'success.main',
          animation: 'pulse 2s infinite ease-in-out',
        },
        '@keyframes pulse': {
          '0%,100%': { transform: 'scale(0.8)', opacity: 0.8 },
          '50%': { transform: 'scale(1.2)', opacity: 0.3 },
        },
      }}
    />
  );

  const onMenuOpen = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };
  const onMenuClose = () => setAnchorEl(null);

  const onAction = (action) => {
    onMenuClose();
    switch (action) {
      case 'pin':
        return handlePinChat(_id);
      case 'mute':
        return handleMuteChat(_id);
      case 'archive':
        return handleArchiveChat(_id);
      case 'delete':
        return handleDeleteChatOpen(_id);
      default:
        return;
    }
  };

  return (
    <NavLink to={`/chat/${_id}`} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Box
            onMouseLeave={() => setAnchorEl(null)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              mb: 1,
              bgcolor: isActive ? 'primary.light' : 'background.paper',
              borderRadius: 2,
              boxShadow: isActive ? 3 : 1,
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'relative', mr: 2 }}>
              {avatarNode}
              {onlineIndicator}
            </Box>

            <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0.5}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography noWrap fontWeight={600} flex={1}>
                  {name}
                </Typography>
                {isPinned && (
                  <Tooltip title="Pinned">
                    <PushPinIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                )}
                {isMuted && (
                  <Tooltip title="Muted">
                    <VolumeOffIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography noWrap color="text.secondary" flex={1}>
                  {isTyping ? 'typing...' : lastMessage}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {isTyping ? '' : formatTime(lastMessageTime)}
                </Typography>
                {newMessage > 0 && (
                  <Chip label={newMessage > 99 ? '99+' : newMessage} size="small" />
                )}
              </Box>
            </Stack>

            <AnimatePresence>
              {(anchorEl || !isActive) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <IconButton size="small" onClick={onMenuOpen} sx={{ ml: 1 }}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={onMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {['pin', 'mute', 'archive', 'delete'].map((action) => {
                const Icon = {
                  pin: PushPinIcon,
                  mute: VolumeOffIcon,
                  archive: ArchiveIcon,
                  delete: DeleteIcon,
                }[action];
                const label = action === 'delete' ? 'Delete' : action.charAt(0).toUpperCase() + action.slice(1);
                return (
                  <MenuItem key={action} onClick={() => onAction(action)}>
                    <ListItemIcon><Icon fontSize="small" color={action === 'delete' ? 'error' : 'inherit'} /></ListItemIcon>
                    <ListItemText primary={label} />
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </motion.div>
      )}
    </NavLink>
  );
};

export default React.memo(ChatItem);
