// Chat.jsx
import React, { useRef } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Avatar,
  List
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { AppLayout } from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { SampleMessages } from '../assets/SampleMessage';

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1, sm: 2 },
        py: { xs: 2, sm: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>C</Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Chat Title
          </Typography>
        </Box>

        {/* Chat messages area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            backgroundColor: 'background.default',
          }}
        >
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {SampleMessages.map((msg, index) => (
              <MessageComponent
                key={index}
                sender={msg.sender}
                content={msg.content}
                timestamp={msg.timestamp}
                direction={msg.direction}
              />
            ))}
          </List>
        </Box>

        {/* Message input footer */}
        <Paper
          component="form"
          onSubmit={e => {
            e.preventDefault();
            // handle send
          }}
          elevation={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            py: 1,
            borderTop: theme => `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
            gap: 1,
          }}
        >
          <IconButton component="label">
            <AttachFileIcon />
            <input hidden type="file" />
          </IconButton>

          <TextField
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            fullWidth
          />

          <IconButton type="submit" color="primary" sx={{ p: 1 }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default AppLayout(Chat);
