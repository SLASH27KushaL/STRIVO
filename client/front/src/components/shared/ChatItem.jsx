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
  useTheme,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  PushPin as PushPinIcon,
  VolumeOff as VolumeOffIcon,
  Archive as ArchiveIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';

const formatTime = (isoTime) => {
  if (!isoTime) return '';
  const diff = Date.now() - new Date(isoTime).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(diff / 3600000);
  return h < 24 ? `${h}h` : new Date(isoTime).toLocaleDateString();
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
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const initials = useMemo(
    () => name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
    [name]
  );

  const avatarNode = useMemo(() => {
    const base = { width: 40, height: 40 };
    if (avatar.length === 1) return <Avatar src={avatar[0]} sx={base} />;
    if (avatar.length > 1) {
      return (
        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': base }}>
          {avatar.map(url => <Avatar key={uuid()} src={url} />)}
        </AvatarGroup>
      );
    }
    return <Avatar sx={{ ...base, bgcolor: theme.palette.primary.main }}>{initials}</Avatar>;
  }, [avatar, initials, theme]);

  const openMenu = e => { e.preventDefault(); setAnchorEl(e.currentTarget); };
  const closeMenu = () => setAnchorEl(null);
  const onAction = action => {
    closeMenu();
    if (action === 'pin') handlePinChat(_id);
    if (action === 'mute') handleMuteChat(_id);
    if (action === 'archive') handleArchiveChat(_id);
    if (action === 'delete') handleDeleteChatOpen(_id);
  };

  return (
    <NavLink to={`/chat/${_id}`} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Box
            onMouseLeave={closeMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              mb: 1,
              bgcolor: isActive ? theme.palette.action.selected : theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Box sx={{ mr: 2, position: 'relative' }}>
              {avatarNode}
              {isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    bgcolor: theme.palette.success.main,
                    borderRadius: '50%',
                  }}
                />
              )}
            </Box>

            <Stack sx={{ flex: 1 }} spacing={0.4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography noWrap fontWeight={600} flex={1} variant="subtitle2">
                  {name}
                </Typography>
                {isPinned && <PushPinIcon fontSize="small" sx={{ ml: 0.5 }} />}
                {isMuted && <VolumeOffIcon fontSize="small" sx={{ ml: 0.5, opacity: 0.6 }} />}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography noWrap color="text.secondary" flex={1} variant="body2">
                  {isTyping ? 'typing…' : lastMessage}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {isTyping ? '' : formatTime(lastMessageTime)}
                </Typography>
                {newMessage > 0 && (
                  <Chip label={newMessage > 99 ? '99+' : newMessage} size="small" sx={{ ml: 1, height: 20 }} />
                )}
              </Box>
            </Stack>

            <IconButton size="small" onClick={openMenu} sx={{ ml: 1 }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu} TransitionComponent={Fade}>
              {['pin','mute','archive','delete'].map(action => {
                const IconComp = { pin: PushPinIcon, mute: VolumeOffIcon, archive: ArchiveIcon, delete: DeleteIcon }[action];
                return (
                  <MenuItem key={action} onClick={() => onAction(action)}>
                    <ListItemIcon><IconComp fontSize="small" /></ListItemIcon>
                    <ListItemText primary={action.charAt(0).toUpperCase() + action.slice(1)} />
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
