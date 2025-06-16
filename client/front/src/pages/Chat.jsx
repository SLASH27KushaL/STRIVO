import React, { useRef } from 'react';
import {AppLayout} from '../components/layout/AppLayout.jsx';
import {
  Box,
  Stack,
  IconButton,
  TextField,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <AppLayout>
      <Stack
        ref={containerRef}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 2,
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
            <ListItem>
              <ListItemText
                primary="Hello, this is a message from the other side."
                secondary="10:00 AM"
              />
            </ListItem>
            <ListItem sx={{ justifyContent: 'flex-end' }}>
              <ListItemText
                primary="Hi! This is your reply."
                secondary="10:05 AM"
                sx={{ textAlign: 'right' }}
              />
            </ListItem>
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
      </Stack>
    </AppLayout>
  );
};

export default AppLayout(Chat);

