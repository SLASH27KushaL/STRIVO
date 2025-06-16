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

import Search from '../specific/Search.jsx';
import Notification from '../specific/Notification.jsx';
import NewGroup from '../specific/NewGroup.jsx'; // Assuming you have a NewGroup component
const Header = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
 const[isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const handleNotificationClick = () => {
    setIsNotificationOpen(true);
    setHasNotifications(false); // Clear badge after opening
  };

  const handleAddClick = () => {
    setIsAddMode(prev => !prev);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
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
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge color="error" variant="dot" invisible={!hasNotifications}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={() => setIsNewGroupOpen(true)} sx={{ ml: 1 }}>
              <AddIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Search open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Notification open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      <NewGroup open={isNewGroupOpen} onClose={() => setIsNewGroupOpen(false)} />
    </>
  );
};

export default Header;