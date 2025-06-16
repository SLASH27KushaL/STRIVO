import React from 'react';
import Header from '../layout/Header.jsx';
import { Box, Typography, useTheme } from '@mui/material';
import ChatList from '../specific/ChatList.jsx';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile.jsx';
import Split from 'react-split';

export const AppLayout = WrappedComponent => {
  return props => {
    const theme = useTheme();
    const params = useParams();
    const chatId = params.chatId || null;

    return (
      <Box
        sx={{
          height: '100vh', // full screen height
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Resizable Area */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0, // allow Split to take full space
            display: 'flex',
            '& .gutter': {
              backgroundColor: '#1e1e2f',
              cursor: 'col-resize',
              width: '6px !important',
            },
          }}
        >
          <Split
            sizes={[25, 50, 25]}
            minSize={200}
            gutterSize={6}
            direction="horizontal"
            style={{ display: 'flex', width: '100%' }}
            gutter={() => {
              const gutter = document.createElement('div');
              gutter.className = 'gutter';
              return gutter;
            }}
          >
            {/* Left Panel */}
            <Box
              sx={{
                bgcolor: theme.palette.grey[100],
                p: 2,
                borderRight: `1px solid ${theme.palette.divider}`,
                overflowY: 'auto',
                height: '100%',
              }}
            >
              <ChatList />
            </Box>

            {/* Main Panel */}
            <Box
              sx={{
                p: 2,
                overflowY: 'auto',
                height: '100%',
              }}
            >
              <WrappedComponent {...props} />
            </Box>

            {/* Right Panel */}
            <Box
              sx={{
                bgcolor: theme.palette.grey[100],
                p: 2,
                borderLeft: `1px solid ${theme.palette.divider}`,
                overflowY: 'auto',
                height: '100%',
              }}
            >
              <Profile />
            </Box>
          </Split>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Strivo. All rights reserved.
          </Typography>
        </Box>
      </Box>
    );
  };
};
