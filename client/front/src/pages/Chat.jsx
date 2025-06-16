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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        textAlign: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            px: 1,
            py: 1,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Avatar sx={{ mr: 2 }}>C</Avatar>
          <Typography variant="h6">Chat Title</Typography>
        </Box>

        {/* Chat messages area */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
          <List>
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
          elevation={4}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // handle send
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            borderRadius: 2,
            backgroundColor: 'background.paper'
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
            sx={{ mx: 1 }}
          />

          <IconButton type="submit" color="primary" sx={{ p: '10px' }}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default AppLayout(Chat);

