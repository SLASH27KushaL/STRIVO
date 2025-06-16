import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  CssBaseline,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';

import Search from '../specific/Search.jsx'; // ✅ make sure path is correct
import Notification from '../specific/Notification.jsx'; // ✅ make sure path is correct
const Header = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const onNotificationClick = () => {
    setHasNotifications(prev => !prev);
    setIsNotificationOpen(true);
  };

  const onAddClick = () => {
    setIsAddMode(prev => !prev);
  };

  const onSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#1e1e2f',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
            Strivo
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton color="inherit" onClick={onSearchClick}>
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" onClick={onNotificationClick}>
              <Badge color="error" variant="dot" invisible={!hasNotifications}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={onAddClick} sx={{ ml: 1 }}>
              <AddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Search Dialog Component */}
      <Search open={isSearchOpen} onClose={handleSearchClose} />

      {/* ✅ Notification Dialog Component */}
      <Notification open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
};

export default Header;
