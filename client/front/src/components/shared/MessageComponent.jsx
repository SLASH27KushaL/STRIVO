// MessageComponent.jsx
import React from 'react';
import { ListItem, ListItemText, Typography, Paper } from '@mui/material';

const MessageComponent = ({ sender, content, timestamp, direction }) => {
  const isOutgoing = direction === 'outgoing';

  return (
    <ListItem
      sx={{
        justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
        px: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1,
          maxWidth: '60%',
          backgroundColor: isOutgoing ? 'primary.main' : 'grey.100',
          color: isOutgoing ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
        }}
      >
        <ListItemText
          primary={
            <Typography
              variant="body1"
              component="span"
              sx={{ wordBreak: 'break-word' }}
            >
              {content}
            </Typography>
          }
          secondary={
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              {sender} • {new Date(timestamp).toLocaleTimeString()}
            </Typography>
          }
        />
      </Paper>
    </ListItem>
  );
};

export default MessageComponent;
