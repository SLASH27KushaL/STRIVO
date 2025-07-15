import React, { useEffect } from 'react';
import Header from '../layout/Header.jsx';
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material';
import ChatList from '../specific/ChatList.jsx';
import Profile from '../specific/Profile.jsx';
import { useParams } from 'react-router-dom';
import Split from 'react-split';
import { useSocket } from '../../Socket.jsx';

export const AppLayout = WrappedComponent => props => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { chatId } = useParams();

  // Retrieve socket from context
  const socket = useSocket();

  // Example: join room when chatId changes
  useEffect(() => {
    if (chatId) {
      socket.emit('joinRoom', chatId);
    }
    return () => {
      if (chatId) socket.emit('leaveRoom', chatId);
    };
  }, [chatId, socket]);

  // On small screens: hide side panels
  const sizes = isSm ? [0, 100, 0] : [20, 60, 20];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Header with elevation */}
      <Paper square elevation={4} sx={{ zIndex: 10 }}>
        <Header />
      </Paper>

      {/* Main split-layout area */}
      <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <Split
          sizes={sizes}
          minSize={isSm ? 0 : 200}
          gutterSize={0}
          direction="horizontal"
          style={{ display: 'flex', width: '100%' }}
        >
          {/* Left Panel */}
          <Paper
            square
            sx={{
              width: isSm ? 0 : 'auto',
              p: 2,
              borderRadius: 0,
              overflowY: 'auto',
            }}
          >
            <ChatList socket={socket} />
          </Paper>

          {/* Main Panel */}
          <Paper
            square
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
            }}
          >
            <WrappedComponent socket={socket} {...props} />
          </Paper>

          {/* Right Panel */}
          <Paper
            square
            sx={{
              width: isSm ? 0 : 'auto',
              p: 2,
              borderRadius: 0,
              overflowY: 'auto',
            }}
          >
            <Profile socket={socket} />
          </Paper>
        </Split>
      </Box>
    </Box>
  );
};

export default AppLayout;
